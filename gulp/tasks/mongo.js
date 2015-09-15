var gulp = require('gulp');
var child_process = require('child_process');
var config = require('../config').mongo;
var notify = require('gulp-notify');

gulp.task('mongo', function () {
	child_process.exec('mongod --dbpath ' + config.dir, function (err, stdout, stderr) {
		console.log(stdout);
		notify('Starting MongoDB...');
	})
});