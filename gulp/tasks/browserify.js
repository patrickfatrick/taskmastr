var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var watchify = require('watchify');
var livereload = require('gulp-livereload');
var config = require('../config').browserify;

watchify.args.debug = config.debug;
var bundler = watchify(browserify(config.src, watchify.args));
config.settings.transform.forEach(function(t) {
  bundler.transform(t);
});

gulp.task('browserify', bundle);
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.pipe(sourcemaps.write())
  .pipe(gulp.dest(config.dest))
  .pipe(livereload());
}
