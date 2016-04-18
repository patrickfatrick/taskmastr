'use strict'

const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const userService = require('../services/user-service')
const bcrypt = require('bcrypt')

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'key',
    passReqToCallback: true
  }, (req, username, key, next) => {
    userService.findUser(username)
    .then((user) => {
      console.log(user)
      if (!user) {
        console.log(username + ' => No user named ' + username)
        return next(null, null)
      }
      console.log(user.username + ' => Found. Validating...')
      bcrypt.compare(key, user.key, (err, same) => {
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

  passport.serializeUser((user, next) => {
    next(null, user.username)
  })

  passport.deserializeUser((username, next) => {
    userService.findUser(username)
    .then(function (user) {
      next(null, user)
    })
  })
}
