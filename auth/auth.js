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
  }, async (req, username, key, next) => {
    try {
      const user = await userService.findUser(username, 'username key tasks currentList darkmode')

      if (!user) return next(null, false, 403)

      const same = await bcrypt.compare(key, user.key)
      if (!same) return next(null, false, 401)

      next(null, user)
    } catch (e) {
      next(e)
    }
  }))

  passport.serializeUser((user, next) => {
    next(null, user.username)
  })

  passport.deserializeUser((username, next) => {
    userService.findUser(username, 'username key tasks currentList darkmode')
    .then(function (user) {
      next(null, user)
    })
    .catch((err) => {
      throw new Error(err)
    })
  })
}
