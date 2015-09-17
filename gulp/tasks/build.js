var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var config = require('../config');

gulp.task('build', ['systemjs', 'styles', 'jade']);
