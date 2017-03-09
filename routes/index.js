'use strict'

module.exports = {
  index: async function (ctx, next) {
    ctx.state.title = 'taskmastr'
    ctx.state.env = process.env.NODE_ENV
    await ctx.render('index')
  },
  fourOhFour: async function (ctx, next) {
    ctx.message = (ctx.response.status === 404)
      ? 'The page you\'re looking for doesn\'t exist.'
      : ctx.response.message
    ctx.state = {
      error: {
        message: ctx.message,
        status: ctx.response.status
      }
    }
    await ctx.render('error')
  }
}
