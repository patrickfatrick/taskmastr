/*var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var config = require('../config').dependencies;


gulp.task('dependencies', function () {
	gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('dependencies.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest));
});*/

var gulp = require('gulp');
var Builder = require('systemjs-builder');
var livereload = require('gulp-livereload');
var config = require('../config').systemjs;

gulp.task('systemjs', function () {
	var builder = new Builder ();
	builder.loadConfig(config.config)
	.then(function () {
		builder.buildSFX(config.src, config.dest, config.options)
		.then(function () {
			gulp.src(config.src)
			.pipe(livereload());
		})
	})
	.catch(function (err) {
		console.log('SystemJS build error...');
		console.log(err);
	});
});