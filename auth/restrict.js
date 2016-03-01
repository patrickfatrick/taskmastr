module.exports = function * (next) {
  if (!this.request.isAuthenticated()) {
    console.log(this.request)
    this.throw(401, 'Unauthorized')
  }
  yield next
}
