var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var config = require('../config').sass;

gulp.task('styles', function() {
  gulp.src(config.src)
	.pipe(sourcemaps.init())
	.pipe(sass(config.settings).on('error', sass.logError))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.dest))
	.pipe(livereload())
	.pipe(notify({
		message: 'Reloading browser...',
		sound: 'Submarine',
		icon: './public/images/iphone-icon.png'
	}));
});
