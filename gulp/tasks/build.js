var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var config = require('../config');

gulp.task('build', ['systemjs', 'styles', 'jade'], function() {
  gulp.src([config.sass.src, config.systemjs.src, config.jade.src])
	.pipe(livereload())
	.pipe(notify('Refreshing...'));
});
