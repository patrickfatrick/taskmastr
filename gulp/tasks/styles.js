var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').sass;
var neat = require('node-neat');
var fontAwesome = require('node-font-awesome');

config.settings.includePaths = neat.with(fontAwesome.scssPath);

gulp.task('styles', function() {
	return gulp.src(config.src)
	.pipe(sourcemaps.init())
	.pipe(sass(config.settings).on('error', sass.logError))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.dest))
	.pipe(browserSync.stream());
});
