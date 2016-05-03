var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var config = require('../config').nodemon

gulp.task('nodemon', function (cb) {
  var started = false

  return nodemon(config)
  .on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb()
      started = true
    }
  })
})