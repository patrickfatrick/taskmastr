var http = require('http')

/* GET home page. */
var index = {
  index: function * (next) {
    try {
      this.state.title = 'taskmastr'
      this.state.env = process.env.NODE_ENV
      yield this.render('index')
    } catch (e) {
      this.status = 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
    yield next
  }
}

module.exports = index
