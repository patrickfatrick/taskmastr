var gulp = require('gulp');
var config = require('../config');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
  gulp.watch(config.sass.src, ['styles']);
	gulp.watch(config.browserify.src, ['browserify']);
	gulp.watch(config.jade.src, ['jade']);
	livereload.listen();
});
