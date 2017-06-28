'use strict'

const errorHandler = require('../utils/error-handler')

module.exports = {
  get: function (ctx, next) {
    try {
      const user = ctx.req.user
      if (!user) {
        ctx.status = 204
        return
      }
      ctx.log(user.username, 'logged in successfully')
      ctx.body = user
    } catch (e) {
      errorHandler(ctx, e)
    }
  }
}
