var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config').jade;

gulp.task('jade', function(cb) {
	gulp.src(config.src)
	.pipe(browserSync.stream());
	return cb();
});
