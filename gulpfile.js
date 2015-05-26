var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	exec = require('child_process').exec;

var jadeSources = './views/*.jade';

var nodeSources = [
	'./app.js',
	'./routes/*js',
	'./services/*.js',
	'./models/*.js',
	'./auth/*.js'
];

var jsSources = [
	//Uncomment the following for production
	'./public/bower/jquery/dist/jquery.min.js',
	'./public/bower/jquery-ui/jquery-ui.min.js',
	'./public/bower/jquery-ui-touch-punch/jquery-ui-touch-punch.js',
	//'./public/bower/lodash/lodash.min.js',
	'./public/bower/angular/angular.min.js',
	'./public/bower/angular-touch/angular-touch.min.js',
	'./public/bower/angular-ui-sortable/sortable.min.js',
	'./public/javascripts/app.js',
	'./public/javascripts/controllers.js',
	'./public/javascripts/working-file.js'
	
];

var sassSources = [
	'./public/stylesheets/*.scss'
];

/*gulp.task('server', function (cb) {
  exec('DEBUG=taskmastr-mean bin/www', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  exec('mongod --dbpath ./data', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});*/

gulp.task('jade', function() {
	gulp.src(jadeSources)
		.pipe(livereload());
});

/*gulp.task('node', function() {
	gulp.src(nodeSources)
		.pipe(livereload());
});*/

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
	//gulp.watch(nodeSources, ['node']);
	livereload.listen();
});

gulp.task('default', ['watch', 'js', 'compass', 'jade']);