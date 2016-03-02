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
  },
  create: function * (next) {
    var ctx = this
    var user = ctx.request.body
    try {
      console.log(userService.addUser(user))
      var result = yield userService.addUser(user)
      console.log(result)
      if (!result) ctx.throw(500, 'Something bad happened')
      console.log(result.username + ' not found.')
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
  },
  forgot: function * (next) {
    var ctx = this
    try {
      yield userService.findUser(ctx.request.body.username, function * (err, user) {
        if (err) throw (err)
        if (!user) {
          console.log('No user: ' + user.username)
          ctx.throw(401, 'No user found.')
        }
        yield userService.setToken(user, function * (err, user) {
          if (err) throw err
          // console.log(user)
          agenda.now('Reset Email', {
            username: user.username,
            resetToken: user.resetToken,
            host: ctx.request.origin
          })
          this.body = {
            emailSent: true
          }
        })
      })
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
      yield userService.resetPassword({
        token: token,
        newKey: newKey
      }, function * (err, user) {
        if (err) throw err
        // console.log(user)
        if (!user) ctx.throw(401)
        ctx.body = {
          username: user.username
        }
      })
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
      // console.log(user)
      // console.log(deleteAgendas)

      // HACK: cancel agendas for deleted tasks
      // Realtime should address
      async.each(deleteAgendas, function * (id, callback) {
        yield agenda.cancel({
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
      async.each(user.tasks, function * (task, callback) {
        yield async.each(task.items, function * (item) {
          // console.log(item)
          yield agenda.cancel({
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
      }, function * (err) {
        if (err) throw err
        yield userService.updateUser(user, function * (err, user) {
          if (err) return next(err)
          console.log('Saving user ' + user.username + '... OK')
          this.body = {username: user.username}
        })
      })
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  logout: function * (next) {
    var ctx = this
    try {
      ctx.logout()
      ctx.clearCookie('name', 'koa.sid')
      ctx.session.destroy(function (err) {
        if (err) throw err
        ctx.redirect('/')
      })
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  }
}

// router.post('/create',
//   setCookieAge,
//   function (req, res, next) {
//     // console.log(req.body)
//     var username = req.body.username
//     var key = req.body.key
//     var rememberMe = req.body.rememberMe
//     var darkmode = req.body.darkmode
//     userService.addUser({
//       username: username,
//       key: key,
//       rememberMe: rememberMe,
//       darkmode: darkmode
//     }, function (err, user) {
//       if (err) console.log(err)
//       console.log(username + ' not found.')
//       console.log('Creating user ' + username + ' ... OK')
//       req.login(user, function (err) {
//         if (err) return next(err)
//         agenda.now('Welcome Email', {
//           username: user.username,
//           host: req.headers.host
//         })
//         return res.send({
//           username: user.username,
//           darkmode: user.darkmode,
//           tasks: user.tasks
//         })
//       })
//     })
//   }
// )

// router.post('/forgot',
//   function (req, res, next) {
//     var username = req.body.username
//     userService.findUser(username, function (err, user) {
//       if (err) return next(err)
//       if (!user) {
//         console.log('No user: ' + username)
//         return res.sendStatus(401)
//       }
//       userService.setToken(user, function (err, user) {
//         if (err) return next(err)
//         // console.log(user)
//         agenda.now('Reset Email', {
//           username: user.username,
//           resetToken: user.resetToken,
//           host: req.headers.host
//         })
//         return res.send({
//           emailSent: true
//         })
//       })
//     })
//   }
// )

// router.post('/reset',
//   function (req, res, next) {
//     var token = req.body.token
//     var newKey = req.body.newKey
//     console.log('Reset token: ' + token)
//     // console.log('New Key: ' + newKey)
//     userService.resetPassword({
//       token: token,
//       newKey: newKey
//     }, function (err, user) {
//       if (err) return next(err)
//       // console.log(user)
//       if (!user) return res.sendStatus(401)
//       return res.send({
//         username: user.username
//       })
//     })
//   }
// )

// router.post('/write', function (req, res, next) {
//   var user = req.body.user
//   var deleteAgendas = req.body.deleteAgendas
//   // console.log(user)
//   // console.log(deleteAgendas)
//   // Workaround to cancel agendas for deleted tasks
//   async.each(deleteAgendas, function (id, callback) {
//     agenda.cancel({
//       'data.agendaID': id
//     }, function (err) {
//       if (err) return next(err)
//       console.log(user.username + ' => Agenda removed: ' + id)
//       callback()
//     })
//   }, function (err) {
//     if (err) return console.log(err)
//     console.log('All deleted agendas removed successfully')
//   })
//   // Cancel current agendas and make new ones
//   async.each(user.tasks, function (task, callback) {
//     async.each(task.items, function (item) {
//       // console.log(item)
//       agenda.cancel({
//         'data.agendaID': item.id
//       }, function (err) {
//         if (err) return next(err)
//         if (item.dueDate) {
//           item.dueDate = new Date(item.dueDate)
//           if (item.dueDate <= Date.now()) return true
//           // Use the following for testing
//           // item.dueDate = Date.now() + 1800000
//           console.log(user.username + ' => Agenda scheduled: ' + item.id + ' ' + item.dueDate)
//           agenda.schedule(item.dueDate, 'Notification Email', {
//             agendaID: item.id,
//             username: user.username,
//             item: item.item,
//             host: req.headers.host,
//             date: item.dueDate
//           })
//         }
//       })
//     }, callback())
//   }, function (err) {
//     if (err) return console.log(err)
//     userService.updateUser(user, function (err, user) {
//       if (err) return next(err)
//       res.send({username: user.username})
//       // console.log(user.tasks[1].items[0])
//       console.log('Saving user ' + user.username + '... OK')
//     })
//   })
// })

// router.get('/logout', function (req, res) {
//   req.logout()
//   res.clearCookie('name', 'connect.sid')
//   req.session.destroy(function (err) {
//     if (err) return console.log(err)
//     res.sendStatus(200)
//   })
// })

module.exports = users
