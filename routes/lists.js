var http = require('http')
var userService = require('../services/user-service')
var listService = require('../services/list-service')

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
      ctx.body = {
        success: true
      }
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
      var userResult = userService.updateUser(user.username, {tasks: user.tasks})
      yield [result, userResult]
      if (!result) ctx.throw(404, 'List not found')
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
