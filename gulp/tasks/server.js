var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../config').nodemon;
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

var notifyConfig = {
	message: 'Starting ' + config.script + '...',
	sound: 'Submarine',
	icon: './public/images/iphone-icon.png'
}
gulp.task('server', function () {
	nodemon(config)
	.on('start', function () {
		gulp.src(config.script)
		.pipe(notify({
			message: 'Starting ' + config.script + '...',
			sound: 'Submarine',
			icon: './public/images/iphone-icon.png'
		}))
	})
	.on('restart', function () {
		gulp.src(config.script)
		.pipe(livereload())
		.pipe(notify({
			message: 'Restarting ' + config.script + '...',
			sound: 'Submarine',
			icon: './public/images/iphone-icon.png'
		}))
	});
});
