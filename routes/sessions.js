'use strict'

const errorHandler = require('../utils/error-handler').errorHandler

module.exports = {
  get: function (ctx, next) {
    try {
      const user = ctx.req.user
      if (!user) return ctx.throw(204)
      console.log(user.username + ' => Sending user... OK')
      ctx.body = user
    } catch (e) {
      errorHandler(ctx, e)
    }
  }
}
