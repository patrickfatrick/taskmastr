'use strict'

const passport = require('koa-passport')
const agenda = require('../services/agenda-service')
const userService = require('../services/user-service')
const config = require('../config')
const errorHandler = require('../utils/error-handler')

module.exports = {
  setCookieAge: async function (ctx, next) {
    if (ctx.request.body.rememberMe) {
      ctx.session.cookie.maxage = config.cookieMaxAge
    }
    await next()
  },
  login: async function (ctx, next) {
    try {
      await passport.authenticate('local', async function (err, result, info, status) {
        if (err) throw err

        if (status === 403) {
          ctx.throw(403, 'No user found with username ' + ctx.request.body.username)
        }

        if (status === 401) ctx.throw(401, 'Invalid password.')

        await ctx.login(result)
        ctx.log(result.username, 'logged in successfully.')
        ctx.body = result
      })(ctx, next)
    } catch (e) {
      errorHandler(ctx, e)
    }
  },
  create: async function (ctx, next) {
    const user = ctx.request.body
    try {
      const found = await userService.findUser(user.username)
      if (found) ctx.throw(400, 'User', found.username, 'already exists')
      const result = await userService.addUser(user)
      if (!result.username) ctx.throw(500, 'Something bad happened at addUser')
      await ctx.login(result)
      agenda.now('Welcome Email', {
        username: user.username,
        host: process.env.HOST || 'http://localhost:3000'
      })
      ctx.body = {
        username: result.username,
        darkmode: result.darkmode,
        tasks: result.tasks
      }
    } catch (e) {
      errorHandler(ctx, e)
    }
  },
  update: async function (payload) {
    const username = payload.username
    const body = payload.body

    const result = await userService.updateUser(username, body)
    if (!result) throw new Error('Something bad happened at updateUser')

    return result
  },
  forgot: async function (ctx, next) {
    const username = ctx.params.username

    try {
      const found = await userService.findUser(username)
      if (!found) ctx.throw(401, 'No user found with username' + username)

      const result = await userService.setToken(found.username)
      if (!result.username) ctx.throw(500, 'Something bad happened at setToken')
      agenda.now('Reset Email', {
        username: result.username,
        resetToken: result.resetToken,
        host: process.env.HOST || 'http://localhost:3000'
      })
    } catch (e) {
      errorHandler(ctx, e)
    }
  },
  reset: async function (ctx, next) {
    const token = ctx.request.body.token
    const newKey = ctx.request.body.newKey
    try {
      const result = await userService.resetPassword({
        token: token,
        newKey: newKey
      })
      if (!result) ctx.throw(401, 'Invalid link')
      ctx.log(result.username, 'password updated successfully')
      ctx.body = {
        username: result.username
      }
    } catch (e) {
      errorHandler(ctx, e)
    }
  },
  logout: async function (ctx, next) {
    ctx.logout()
    ctx.session = null
    ctx.redirect('/')
  }
}
