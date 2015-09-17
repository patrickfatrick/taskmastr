var gulp = require('gulp');
var Builder = require('systemjs-builder');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var config = require('../config').systemjs;

gulp.task('systemjs', function () {
	var builder = new Builder ();
	builder.loadConfig(config.config)
	.then(function () {
		builder.buildSFX(config.src, config.dest, config.options)
		.then(function () {
			gulp.src(config.src)
			.pipe(livereload())
			.pipe(notify({
				message: 'Reloading browser...',
				sound: 'Submarine',
				icon: './public/images/iphone-icon.png'
			}));
		})
	})
	.catch(function (err) {
		console.log('SystemJS build error...');
		console.log(err);
	});
});