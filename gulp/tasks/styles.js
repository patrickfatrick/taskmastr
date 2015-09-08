var gulp = require('gulp');
var compass = require('gulp-compass');
//var gls = require('gulp-live-server');
//var server = gls('./bin/www', {env: {NODE_ENV: 'development'}});
var livereload = require('gulp-livereload');
//var browserSync = require('browser-sync');
var config = require('../config.js').sass;

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(compass(config.settings))
    .pipe(gulp.dest(config.dest))
    .pipe(livereload());
});
