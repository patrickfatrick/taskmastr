var http = require('http')

/* GET home page. */
var index = {
  index: function * (next) {
    try {
      var vm = {
        title: 'taskmastr',
        error: this.request.flash('error'),
        env: process.env.NODE_ENV
      }
      this.render({
        index: vm
      })
    } catch (e) {
      this.status = 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
    yield next
  },
  sessionData: function * (next) {
    try {
      var user = this.request.user
      if (!user) return this.throw(204)
      console.log('Sending user ' + user.username + '... OK')
      this.body = {
        username: user.username,
        darkmode: user.darkmode,
        tasks: (user.tasks.length) ? user.tasks : user.todos
      }
    } catch (e) {
      this.status = 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
    yield next
  }
}

module.exports = index
