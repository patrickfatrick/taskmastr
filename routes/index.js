/* GET home page. */
var index = {
  index: function * (next) {
    this.state.title = 'taskmastr'
    this.state.env = process.env.NODE_ENV
    yield this.render('index')
  },
  fourOhFour: function * (next) {
    this.state = {
      error: {
        message: this.response.message,
        status: this.response.status
      }
    }
    yield this.render('error')
  }
}

module.exports = index
