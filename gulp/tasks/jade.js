var gulp = require('gulp');
//var gls = require('gulp-live-server');
//var server = gls('./bin/www', {env: {NODE_ENV: 'development'}});
var livereload = require('gulp-livereload');
//var browserSync = require('browser-sync');
var config = require('../config').jade;

gulp.task('jade', function() {
  return gulp.src(config.src)
    .pipe(livereload());
});
