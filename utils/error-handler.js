const http = require('http')

module.exports = function errorHandler (ctx, e) {
  if (e.status < 200 || e.status > 300) console.error(e)
  ctx.status = e.status || 500
  ctx.body = e.message || http.STATUS_CODES[ctx.status]
}
