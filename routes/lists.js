var http = require('http')
var async = require('async')
var userService = require('../services/user-service')
var listService = require('../services/list-service')
var agenda = require('../services/agenda-service')

var lists = {
  get: function * (next) {
    var ctx = this
    try {
      var result = yield listService.getList(ctx.params.listid)
      if (!result) ctx.throw(404, 'List not found')
      ctx.body = result
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  create: function * (next) {
    var ctx = this
    var list = this.request.body.list
    var user = this.request.body.user
    try {
      var result = listService.addList(list)
      var userResult = userService.updateUser(user.username, { tasks: user.tasks })
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
    var ctx = this
    var user = ctx.request.body.user
    try {
      var result = listService.deleteList(ctx.params.listid)
      var userResult = userService.updateUser(user.username, { tasks: user.tasks })
      var results = yield [result, userResult]
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
    var ctx = this
    var user = ctx.request.body.user
    var listId = ctx.params.listid
    var listBody = ctx.request.body.listBody
    try {
      var result = listService.updateList(listId, listBody)
      var userResult = userService.updateUser(user.username, { tasks: user.tasks })
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
