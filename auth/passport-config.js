module.exports = function () {
  var passport = require('passport')
  var LocalStrategy = require('passport-local').Strategy
  var userService = require('../services/user-service')
  var bcrypt = require('bcrypt')

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'key',
    passReqToCallback: true
  }, function (req, username, key, next) {
    // console.log(username + ' ' + key)
    userService.findUser(username, function (err, user) {
      if (err) {
        return next(err)
      }
      if (!user) {
        console.log('No user named ' + username)
        return next(null, null)
      }
      console.log('User ' + username + ' found. Validating...')
      bcrypt.compare(key, user.key, function (err, same) {
        if (err) {
          return next(err)
        }
        if (!same) {
          console.log('Passwords don\'t match')
          // console.log('user key: ' + user.key)
          return next(null, 401)
        }
        console.log('Validating ' + username + '... OK')
        next(null, user)
      })
    })
  }))

  passport.serializeUser(function (user, next) {
    next(null, user.username)
  })

  passport.deserializeUser(function (username, next) {
    userService.findUser(username,
      function (err, user) {
        next(err, user)
      }
    )
  })
}
