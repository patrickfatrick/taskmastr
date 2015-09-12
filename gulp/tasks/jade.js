var gulp = require('gulp');
var livereload = require('gulp-livereload');
var config = require('../config').jade;

gulp.task('jade', function() {
  gulp.src(config.src)
	.pipe(livereload());;
});
