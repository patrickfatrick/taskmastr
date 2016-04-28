var gulp = require('gulp')
var config = require('../config').animate

gulp.task('animate', function () {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest))
})
