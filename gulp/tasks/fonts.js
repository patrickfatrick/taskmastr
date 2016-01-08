var gulp = require('gulp');
var fontAwesome = require('node-font-awesome');
var config = require('../config').fonts;

gulp.task('fonts', function() {
	gulp.src(fontAwesome.fonts)
	.pipe(gulp.dest(config.dest));
});