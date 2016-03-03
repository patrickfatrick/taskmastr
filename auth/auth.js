var passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
var userService = require('../services/user-service')
var bcrypt = require('bcrypt')

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'key',
    passReqToCallback: true
  }, function (req, username, key, next) {
    userService.findUser(username)
    .then(function (user) {
      if (!user) {
        console.log(username + ' => No user named ' + username)
        return next(null, null)
      }
      console.log(username + ' => Found. Validating...')
      bcrypt.compare(key, user.key, function (err, same) {
        if (err) return next(err)
        if (!same) {
          console.log('Passwords don\'t match')
          // console.log('user key: ' + user.key)
          return next(null, 401)
        }
        console.log(username + ' => Validating... OK')
        next(null, user)
      })
    })
  }))

  passport.serializeUser(function (user, next) {
    next(null, user.username)
  })

  passport.deserializeUser(function (username, next) {
    userService.findUser(username)
    .then(function (user) {
      next(null, user)
    })
  })
}
