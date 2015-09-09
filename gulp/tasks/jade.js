var gulp = require('gulp');
var livereload = require('gulp-livereload');
var config = require('../config').jade;

gulp.task('jade', function() {
  return gulp.src(config.src)
    .pipe(livereload());
});
