/*var gulp = require('gulp');
var Builder = require('systemjs-builder');
var config = require('../config').min;

gulp.task('min', function (cb) {
	var builder = new Builder ();
	
	builder.loadConfig(config.config)
	.then(function () {
		builder.buildStatic(config.src, config.dest, config.options)
		.catch(function (err) {
			console.log('SystemJS build error...');
			cb(new Error(err));
		});
	});
});*/

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var config = require('../config').min;

gulp.task('min', function () {
	gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('reform.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.dest));
});