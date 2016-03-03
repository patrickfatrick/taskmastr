/* GET home page. */
var index = {
  index: function * (next) {
    this.state.title = 'taskmastr'
    this.state.env = process.env.NODE_ENV
    yield this.render('index')
  }
}

module.exports = index
