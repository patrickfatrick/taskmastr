var gulp = require('gulp')
var config = require('../config').socketIO

gulp.task('socket-io', function () {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest))
})
