var http = require('http')
var passport = require('koa-passport')
var agenda = require('../services/agenda-service')
var agendaHelpers = require('../services/agenda-helpers')
var userService = require('../services/user-service')
var config = require('../config')

var users = {
  setCookieAge: function * (next) {
    if (this.request.body.rememberMe) {
      this.session.cookie.maxage = config.cookieMaxAge
    }
    yield next
  },
  login: function * (next) {
    var ctx = this
    try {
      yield passport.authenticate('local', function * (err, user, info) {
        if (err) throw err
        if (!user) ctx.throw(204, 'No user found.')
        if (user === 401) ctx.throw(401, 'Invalid password.')
        yield ctx.login(user)
        console.log(user.username + ' => Sending user... OK')
        ctx.body = {
          username: user.username,
          darkmode: user.darkmode,
          tasks: (user.tasks.length) ? user.tasks : user.todos
        }
      }).call(this, next)
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  create: function * (next) {
    var ctx = this
    var user = ctx.request.body
    try {
      var found = yield userService.findUser(user.username)
      if (found) {
        console.log(found.username + ' => Already a user')
        ctx.throw(400, 'User already exists')
      }
      var result = yield userService.addUser(user)
      if (!result.username) ctx.throw(500, 'Something bad happened')
      console.log(result.username + ' => Creating user... OK')
      yield ctx.login(result)
      agenda.now('Welcome Email', {
        username: user.username,
        host: ctx.request.origin
      })
      ctx.body = {
        username: result.username,
        darkmode: result.darkmode,
        tasks: result.tasks
      }
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  write: function * (next) {
    var ctx = this
    try {
      var user = ctx.request.body.user
      var deleteAgendas = ctx.request.body.deleteAgendas

      yield agendaHelpers.deleteAgendas(user, deleteAgendas)
      yield agendaHelpers.remakeAgendas(user, ctx.request.origin)

      var result = yield userService.updateUser(user)
      if (!result.username) ctx.throw(500, 'Something bad happened')
      console.log(user.username + ' => Saving user... OK')
      ctx.status = 200
      ctx.body = {username: user.username}
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  forgot: function * (next) {
    var ctx = this
    try {
      var user = yield userService.findUser(ctx.request.body.username)
      if (!user) {
        console.log('No user: ' + user.username)
        ctx.throw(401, 'No user found.')
      }
      var result = yield userService.setToken(user)
      if (!result.username) ctx.throw(500, 'Something bad happened.')
      agenda.now('Reset Email', {
        username: result.username,
        resetToken: result.resetToken,
        host: ctx.request.origin
      })
      this.body = {
        emailSent: true
      }
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  reset: function * (next) {
    var ctx = this
    try {
      var token = ctx.request.body.token
      var newKey = ctx.request.body.newKey
      // console.log('Reset token: ' + token)
      // console.log('New Key: ' + newKey)
      var result = yield userService.resetPassword({
        token: token,
        newKey: newKey
      })
      if (!result) ctx.throw(401, 'Invalid link')
      console.log(result.username + ' => Password updated')
      ctx.body = {
        username: result.username
      }
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  logout: function * (next) {
    this.logout()
    this.session = null
    this.redirect('/')
  }
}

module.exports = users
