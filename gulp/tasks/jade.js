var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var config = require('../config').jade;

gulp.task('jade', function(cb) {
  gulp.src(config.src)
	.pipe(livereload())
	.pipe(notify({
		message: 'Reloading browser...',
		sound: 'Submarine',
		icon: './public/images/iphone-icon.png'
	}));
	return cb();
});
