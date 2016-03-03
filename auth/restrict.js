module.exports = function * (next) {
  if (!this.isAuthenticated()) {
    this.status = 401
    this.body = this.status
  } else {
    yield next
  }
}
