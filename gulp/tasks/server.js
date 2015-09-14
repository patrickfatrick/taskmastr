var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../config').nodemon;
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

gulp.task('server', function () {
	nodemon(config)
	.on('restart', function () {
		gulp.src(config.script)
		.pipe(livereload())
		.pipe(notify('Restarting ' + config.script + '...'))
	});
});
