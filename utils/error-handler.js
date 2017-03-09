const http = require('http')

exports.errorHandler = function (ctx, e) {
  console.error(e)
  ctx.status = e.status || 500
  ctx.body = e.message || http.STATUS_CODES[ctx.status]
}
