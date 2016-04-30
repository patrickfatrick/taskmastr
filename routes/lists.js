'use strict'

const chalk = require('chalk')
const http = require('http')
const async = require('async')
const userService = require('../services/user-service')
const listService = require('../services/list-service')
const agenda = require('../services/agenda-service')

const lists = {
  get: function * (next) {
    const ctx = this
    try {
      const result = yield listService.getList(ctx.params.listid)
      if (!result) ctx.throw(404, 'List not found')
      ctx.body = result
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  create: function (payload) {
    const list = payload.list
    const user = payload.user

    const listResult = listService.addList(list)
    const userResult = userService.updateUser(user.username, { tasks: user.tasks })
    return Promise.all([listResult, userResult])
    .then((results) => {
      if (!results[0]) throw new Error('Something bad happened at addList')
      if (!results[1]) throw new Error('Something bad happened at updateUser')
      return results
    })
  },
  delete: function (payload) {
    const user = payload.user

    const listResult = listService.deleteList(payload.listid)
    const userResult = userService.updateUser(user.username, { tasks: user.tasks })
    return Promise.all([listResult, userResult])
    .then((results) => {
      if (!results[0]) throw new Error('List not found')
      if (!results[1]) throw new Error('Something bad happened at updateUser')

      // Round up the ids of each item and cancel their agenda tasks
      async.each(results[0].items, (v, cb) => {
        agenda.cancel({
          'data.agendaID': v.id
        }, (err) => {
          if (err) throw new Error(err)
          console.log(user.username + ' => Agenda removed: ' + v.id)
          cb()
        })
      }, function (err) {
        if (err) throw new Error(err)
        console.log(`List agendas removed ${chalk.gray(results[0].id)}`)
      })

      return results
    })
  },
  update: function (payload) {
    const user = payload.user
    const listid = payload.listid
    const listBody = payload.listBody

    const listResult = listService.updateList(listid, listBody)
    const userResult = userService.updateUser(user.username, { tasks: user.tasks })
    return Promise.all([listResult, userResult])
    .then((results) => {
      if (!results[0]) throw new Error('Something bad happened at updateList')
      if (!results[1]) throw new Error('Something bad happened at updateUser')
      return results
    })
  }
}

module.exports = lists
