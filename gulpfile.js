var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps');

var jadeSources = './views/*.jade';

var nodeSources = [
	'./app.js',
	'./routes/*js',
	'./services/*.js',
	'./models/*.js',
	'./auth/*.js'
];

var jsSources = [
	'./public/bower/jquery/dist/jquery.min.js',
	'./public/bower/lodash/lodash.min.js',
	'./public/bower/velocity/velocity.min.js',
	'./public/bower/angular/angular.min.js',
	'./public/bower/angular-touch/angular-touch.min.js',
	'./public/bower/angular-animate/angular-animate.js',
	'./public/bower/angular-strap/dist/angular-strap.min.js',
	'./public/bower/angular-strap/dist/angular-strap.tpl.js',
	'./public/bower/Sortable/Sortable.js',
	'./public/bower/Sortable/ng-sortable.js',
	'./public/javascripts/app.js',
	'./public/javascripts/controllers.js',
	'./public/javascripts/directives.js',
	'./public/javascripts/working-file.js'
];

var sassSources = [
	'./public/stylesheets/*.scss'
];

gulp.task('jade', function() {
	gulp.src(jadeSources)
		.pipe(livereload());
});

gulp.task('js', function () {
	gulp.src(jsSources)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/javascripts'))
		.pipe(livereload());
});

gulp.task('compass', function () {
	gulp.src(sassSources)
		.pipe(compass({
			config_file: './config.rb',
			css: './public/stylesheets',
			sass: './public/stylesheets',
			sourcemap: true
		}))
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(livereload());
});

gulp.task('watch', function () {
	gulp.watch(jsSources, ['js']);
	gulp.watch('*.html');
	gulp.watch('styles/*.css');
	gulp.watch(sassSources, ['compass']);
	gulp.watch(jadeSources, ['jade']);
	livereload.listen();
});

gulp.task('default', ['watch', 'js', 'compass', 'jade']);
