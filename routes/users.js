'use strict'

const http = require('http')
const passport = require('koa-passport')
const agenda = require('../services/agenda-service')
const userService = require('../services/user-service')
const config = require('../config')

const users = {
  setCookieAge: function * (next) {
    if (this.request.body.rememberMe) {
      this.session.cookie.maxage = config.cookieMaxAge
    }
    yield next
  },
  login: function * (next) {
    const ctx = this
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
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  create: function * (next) {
    const ctx = this
    const user = this.request.body
    try {
      const found = yield userService.findUser(user.username)
      if (found) {
        console.log(found.username + ' => Already a user')
        ctx.throw(400, 'User already exists')
      }
      const result = yield userService.addUser(user)
      if (!result.username) ctx.throw(500, 'Something bad happened')
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
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  update: function (payload) {
    const username = payload.username
    const body = payload.body
    return userService.updateUser(username, body)
    .then((result) => {
      if (!result) throw new Error('Something bad happened at updateUser')
      return result
    })
  },
  forgot: function * (next) {
    const ctx = this
    const username = this.params.username

    try {
      const user = yield userService.findUser(username)
      if (!user) {
        console.log('No user: ' + user.username)
        ctx.throw(401, 'No user found.')
      }
      const result = yield userService.setToken(user)
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
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  reset: function * (next) {
    const ctx = this
    const token = this.request.body.token
    const newKey = this.request.body.newKey
    try {
      const result = yield userService.resetPassword({
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
