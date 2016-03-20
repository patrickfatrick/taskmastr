var gulp = require('gulp')
var exec = require('child_process').exec
var config = require('../config').mongo

var runCommand = function (command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    if (err !== null) {
      console.log('exec error: ' + err)
    }
  })
}

gulp.task('rethinkdb', function (cb) {
  var command = 'rethinkdb'
  runCommand(command)
  return cb()
})
