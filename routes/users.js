var express = require('express')
var router = express.Router()
var passport = require('passport')
var async = require('async')
var config = require('../config')
var agenda = require('../services/agenda')
var userService = require('../services/user-service')

router.post('/login',
  function (req, res, next) {
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = config.cookieMaxAge
    }
    next()
  },
  function (req, res, next) {
    // console.log(req.body)
    return passport.authenticate('local', {
      failureFlash: true
    }, function (err, user, info) {
      // console.log(user)
      // console.log(info)
      // console.log(err)
      if (err) return console.log(err)
      if (!user) return res.sendStatus(204)
      if (user === 401) return res.sendStatus(401)
      req.login(user, function (err) {
        if (err) return next(err)
        // console.log(user)
        console.log('Sending user ' + user.username + '... OK')
        return res.send({
          username: user.username,
          darkmode: user.darkmode,
          tasks: (user.tasks.length) ? user.tasks : user.todos
        })
      })
    })(req, res, next)
  }
)

router.post('/create',
  function (req, res, next) {
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = config.cookieMaxAge
    }
    next()
  },
  function (req, res, next) {
    // console.log(req.body)
    var username = req.body.username
    var key = req.body.key
    var rememberMe = req.body.rememberMe
    userService.addUser({
      username: username,
      key: key,
      rememberMe: rememberMe
    }, function (err, user) {
      if (err) console.log(err)
      console.log(username + ' not found.')
      console.log('Creating user ' + username + ' ... OK')
      req.login(user, function (err) {
        if (err) return next(err)
        agenda.now('Welcome Email', {
          username: user.username,
          host: req.headers.host
        })
        return res.send({
          username: user.username,
          darkmode: user.darkmode,
          tasks: user.tasks
        })
      })
    })
  }
)

router.post('/forgot',
  function (req, res, next) {
    var username = req.body.username
    userService.findUser(username, function (err, user) {
      if (err) return next(err)
      if (!user) {
        console.log('No user: ' + username)
        return next(null, null)
      }
      userService.setToken(user, function (err, user) {
        if (err) return next(err)
        // console.log(user)
        agenda.now('Reset Email', {
          username: user.username,
          resetToken: user.resetToken,
          host: req.headers.host
        })
        return res.send({
          emailSent: true
        })
      })
    })
  }
)

router.post('/reset',
  function (req, res, next) {
    var token = req.body.token
    var newKey = req.body.newKey
    console.log('Reset token: ' + token)
    // console.log('New Key: ' + newKey)
    userService.resetPassword({
      token: token,
      newKey: newKey
    }, function (err, user) {
      if (err) return next(err)
      // console.log(user)
      if (!user) return res.sendStatus(401)
      return res.send({
        username: user.username
      })
    })
  }
)

router.post('/write', function (req, res, next) {
  var user = req.body.user
  var deleteAgendas = req.body.deleteAgendas
  // console.log(user)
  // console.log(deleteAgendas)
  // Workaround to cancel agendas for deleted tasks
  async.each(deleteAgendas, function (id, callback) {
    agenda.cancel({
      'data.agendaID': id
    }, function (err) {
      if (err) return next(err)
      console.log(user.username + ' => Agenda removed: ' + id)
      callback()
    })
  }, function (err) {
    if (err) return console.log(err)
    console.log('All deleted agendas removed successfully')
  })
  // Cancel current agendas and make new ones
  async.each(user.tasks, function (task, callback) {
    async.each(task.items, function (item) {
      // console.log(item)
      agenda.cancel({
        'data.agendaID': item.id
      }, function (err) {
        if (err) return next(err)
        console.log(user.username + ' => Agenda removed: ' + item.id)
        if (item.dueDate) {
          item.dueDate = new Date(item.dueDate)
          if (item.dueDate <= Date.now()) return true
          // Use the following for testing
          // item.dueDate = Date.now() + 1800000
          console.log(user.username + ' => Agenda scheduled: ' + item.id + ' ' + item.dueDate)
          agenda.schedule(item.dueDate, 'Notification Email', {
            agendaID: item.id,
            username: user.username,
            item: item.item,
            host: req.headers.host,
            date: item.dueDate
          })
        }
      })
    }, callback())
  }, function (err) {
    if (err) return console.log(err)
    userService.updateUser(user, function (err, user) {
      if (err) return next(err)
      res.sendStatus(200)
      // console.log(user.tasks[1].items[0])
      console.log('Saving user ' + user.username + '... OK')
    })
  })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.clearCookie('name', 'connect.sid')
  req.session.destroy(function (err) {
    if (err) return console.log(err)
    res.sendStatus(200)
  })
})

module.exports = router