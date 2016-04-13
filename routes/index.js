'use strict'

const index = {
  index: function * (next) {
    this.state.title = 'taskmastr'
    this.state.env = process.env.NODE_ENV
    yield this.render('index')
  },
  fourOhFour: function * (next) {
    this.message = (this.response.status === 404)
      ? 'The page you\'re looking for doesn\'t exist.'
      : this.response.message
    this.state = {
      error: {
        message: this.message,
        status: this.response.status
      }
    }
    yield this.render('error')
  }
}

module.exports = index
