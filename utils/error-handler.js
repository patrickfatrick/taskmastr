const http = require('http')

module.exports = function errorHandler (ctx, e) {
  ctx.log.error(e.message, (!e.status) ? e.stack : '')
  ctx.status = e.status || 500
  ctx.body = e.message || http.STATUS_CODES[ctx.status]
}
