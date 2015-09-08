var gulp = require('gulp');
//var gls = require('gulp-live-server');
//var server = gls('./bin/www', {env: {NODE_ENV: 'development'}});
var livereload = require('gulp-livereload');
//var browserSync = require('browser-sync');
var config = require('../config').watch;

gulp.task('build', ['browserify', 'styles', 'jade'], function() {
  gulp.src(config.src).pipe(livereload());
});
