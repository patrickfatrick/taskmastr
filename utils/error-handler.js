const http = require('http')

module.exports = function errorHandler (ctx, e) {
  console.error(e)
  ctx.status = e.status || 500
  ctx.body = e.message || http.STATUS_CODES[ctx.status]
}
