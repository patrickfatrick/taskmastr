'use strict'

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
  create: function * (next) {
    const ctx = this
    const list = this.request.body.list
    const user = this.request.body.user
    try {
      const listResult = listService.addList(list)
      const userResult = userService.updateUser(user.username, { tasks: user.tasks })
      const results = yield [listResult, userResult]
      if (!results[0]) ctx.throw(500, 'Something bad happened at addList')
      if (!results[1]) ctx.throw(500, 'Something bad happened at updateUser')
      ctx.body = results[0]
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  delete: function * (next) {
    const ctx = this
    const user = ctx.request.body.user
    try {
      const listResult = listService.deleteList(ctx.params.listid)
      const userResult = userService.updateUser(user.username, { tasks: user.tasks })
      const results = yield [listResult, userResult]
      if (!results[0]) ctx.throw(404, 'List not found')
      if (!results[1]) ctx.throw(500, 'Something bad happened at updateUser')

      // Round up the ids of each item and cancel their agenda tasks
      async.each(results[0].items, (v, cb) => {
        agenda.cancel({
          'data.agendaID': v.id
        }, (err) => {
          if (err) ctx.throw(err)
          console.log(user.username + ' => Agenda removed: ' + v.id)
          cb()
        })
      }, function (err) {
        if (err) ctx.throw(err)
        console.log(`${results[0].id} => All deleted agendas removed successfully`)
      })

      ctx.body = {
        success: true
      }
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  update: function * (next) {
    const ctx = this
    const user = ctx.request.body.user
    const listId = ctx.params.listid
    const listBody = ctx.request.body.listBody
    try {
      const listResult = listService.updateList(listId, listBody)
      const userResult = userService.updateUser(user.username, { tasks: user.tasks })
      const results = yield [listResult, userResult]
      if (!results[0]) ctx.throw(500, 'Something bad happened at updateList')
      if (!results[1]) ctx.throw(500, 'Something bad happened at updateUser')
      ctx.body = results[0]
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  }
}

module.exports = lists
