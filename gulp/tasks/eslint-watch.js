var gulp = require('gulp')
var runCommand = require('../run-command')

gulp.task('eslint-watch', function (cb) {
  runCommand('npm run code-fix')
  return cb()
})
