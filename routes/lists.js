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
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  create: function * (next) {
    const ctx = this
    const list = this.request.body.list
    const user = this.request.body.user
    try {
      const result = listService.addList(list)
      const userResult = userService.updateUser(user.username, { tasks: user.tasks })
      yield [result, userResult]
      if (!result) ctx.throw(500, 'Something bad happened at addList')
      if (!userResult) ctx.throw(500, 'Something bad happened at updateUser')
      ctx.body = result
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  delete: function * (next) {
    const ctx = this
    const user = ctx.request.body.user
    console.log(user.tasks)
    try {
      const result = listService.deleteList(ctx.params.listid)
      const userResult = userService.updateUser(user.username, { tasks: user.tasks })
      const results = yield [result, userResult]
      if (!result) ctx.throw(404, 'List not found')
      if (!userResult) ctx.throw(500, 'Something bad happened at updateUser')

      // Round up the ids of each item and cancel their agenda tasks
      async.each(results[0]['old_val'].items, (v, cb) => {
        agenda.cancel({
          'data.agendaID': v.id
        }, (err) => {
          if (err) ctx.throw(err)
          console.log(user.username + ' => Agenda removed: ' + v.id)
          cb()
        })
      }, function (err) {
        if (err) ctx.throw(err)
        console.log(`${results[0]['old_val'].id} => All deleted agendas removed successfully`)
      })

      ctx.body = {
        success: true
      }
    } catch (e) {
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
      const result = listService.updateList(listId, listBody)
      const userResult = userService.updateUser(user.username, { tasks: user.tasks })
      yield [result, userResult]
      if (!result) ctx.throw(500, 'Something bad happened at addList')
      if (!userResult) ctx.throw(500, 'Something bad happened at updateUser')
      ctx.body = {
        success: true
      }
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  }
}

module.exports = lists
