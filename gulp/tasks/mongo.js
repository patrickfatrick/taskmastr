var gulp = require('gulp')
var runCommand = require('../run-command')
var config = require('../config').mongo

gulp.task('mongo-start', function (cb) {
  var command = 'mkdir -p data && mongod --dbpath ' + config.dir
  runCommand(command)
  return cb()
})

gulp.task('mongo-stop', function (cb) {
  var command = 'mongo admin --eval ' + 'db.shutdownServer()'
  runCommand(command)
  return cb()
})
