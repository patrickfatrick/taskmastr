var http = require('http')

/* GET session */
var sessions = {
  get: function * (next) {
    try {
      var user = this.req.user
      if (!user) return this.throw(204)
      console.log(user.username + ' => Sending user... OK')
      this.body = {
        username: user.username,
        darkmode: user.darkmode,
        tasks: (user.tasks.length) ? user.tasks : user.todos
      }
    } catch (e) {
      this.status = e.status || 500
      this.body = e.statusCode || http.STATUS_CODES[this.status]
    }
    yield next
  }
}

module.exports = sessions
