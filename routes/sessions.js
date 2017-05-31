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
      console.log(user.username + ' => Sending user... OK')
      ctx.body = user
    } catch (e) {
      errorHandler(ctx, e)
    }
  }
}
