var gulp = require('gulp');
var Builder = require('systemjs-builder');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var config = require('../config').systemjs;
var gzip = require('gulp-gzip');

gulp.task('systemjs', function (cb) {
	var builder = new Builder ();

	/**
	* Unfortunately his must run synchronously (nested);
	* Promise.all doesn't run functions in sequence and buildStatis must come after loadConfig
	*/

	builder.loadConfig(config.config)
	.then(function () {
		builder.buildStatic(config.src, config.dest, config.options)
		.then(function () {
			gulp.src(config.src)
			.pipe(livereload())
			.pipe(notify({
				message: 'Reloading browser...',
				sound: 'Submarine',
				icon: './public/images/iphone-icon.png'
			}));
			return cb();
		})
		.catch(function (err) {
			console.log('SystemJS build error...');
			cb(new Error(err));
		});
	});
});
