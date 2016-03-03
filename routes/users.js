var http = require('http')
var passport = require('koa-passport')
var async = require('async')
var agenda = require('../services/agenda')
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
        console.log('Sending user ' + user.username + '... OK')
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
    yield next
  },
  create: function * (next) {
    var ctx = this
    var user = ctx.request.body
    try {
      var result = yield userService.addUser(user)
      if (!result.username) ctx.throw(500, 'Something bad happened')
      console.log('Creating user ' + result.username + ' ... OK')
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
    yield next
  },
  write: function * (next) {
    var ctx = this
    try {
      var user = ctx.request.body.user
      var deleteAgendas = ctx.request.body.deleteAgendas

      // Cancel agendas for deleted tasks
      async.each(deleteAgendas, function (id, callback) {
        agenda.cancel({
          'data.agendaID': id
        }, function (err) {
          if (err) throw err
          console.log(user.username + ' => Agenda removed: ' + id)
          callback()
        })
      }, function (err) {
        if (err) throw err
        console.log('All deleted agendas removed successfully')
      })

      // Cancel current agendas and make new ones
      async.each(user.tasks, function (task, callback) {
        async.each(task.items, function (item) {
          // console.log(item)
          agenda.cancel({
            'data.agendaID': item.id
          }, function (err) {
            if (err) throw err
            if (item.dueDate) {
              item.dueDate = new Date(item.dueDate)
              if (item.dueDate <= Date.now()) return true
              console.log(user.username + ' => Agenda scheduled: ' + item.id + ' ' + item.dueDate)
              agenda.schedule(item.dueDate, 'Notification Email', {
                agendaID: item.id,
                username: user.username,
                item: item.item,
                host: ctx.request.origin,
                date: item.dueDate
              })
            }
          })
        }, callback())
      }, function (err) {
        if (err) throw err
        userService.updateUser(user)
        .then(function (result) {
          if (!result.username) ctx.throw(500, 'Something bad happened')
          console.log('Saving user ' + user.username + '... OK')
          ctx.status = 200
          ctx.body = {username: user.username}
        })
      })
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
    yield next
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
      if (!result) ctx.throw(500, 'Something bad happened.')
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
      console.log('Reset token: ' + token)
      // console.log('New Key: ' + newKey)
      var result = yield userService.resetPassword({
        token: token,
        newKey: newKey
      })
      if (!result) ctx.throw(500, 'Something bad happened.')
      if (!result) ctx.throw(401)
      ctx.body = {
        username: result.username
      }
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  logout: function * (next) {
    this.logout()
    this.session = null
    yield next
  }
}

module.exports = users
