'use strict'

const http = require('http')

const sessions = {
  get: function * (next) {
    try {
      const user = this.req.user
      if (!user) return this.throw(204)
      console.log(user.username + ' => Sending user... OK')
      this.body = {
        username: user.username,
        darkmode: user.darkmode,
        tasks: user.tasks || []
      }
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.statusCode || http.STATUS_CODES[this.status]
    }
  }
}

module.exports = sessions
