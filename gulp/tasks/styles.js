var gulp = require('gulp');
var compass = require('gulp-compass');
var livereload = require('gulp-livereload');
var config = require('../config.js').sass;

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(compass(config.settings))
    .pipe(gulp.dest(config.dest))
    .pipe(livereload());
});
