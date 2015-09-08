var gulp = require('gulp');
var config = require('../config').watch;
var livereload = require('gulp-livereload');
//var browserSync = require('browser-sync');

gulp.task('watch', ['build'], function() {
  gulp.watch(config.src, config.tasks);
	livereload.listen();
	//browserSync.reload();
});
