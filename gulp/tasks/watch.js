var gulp = require('gulp');
var config = require('../config').watch;
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
  gulp.watch(config.sass.src, config.sass.tasks);
	gulp.watch(config.systemjs.src, config.systemjs.tasks);
	gulp.watch(config.jade.src, config.jade.tasks);
	//gulp.watch(config.src, config.tasks);
	livereload.listen();
});
