var gulp = require('gulp');
var exec = require('child_process').exec;
var config = require('../config').mongo;

var runCommand = function(command) {
	exec(command, function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		if (err !== null) {
			console.log('exec error: ' + err);
		}
	});
};

gulp.task('mongo-start', function(cb) {
	var command = 'mongod --dbpath ' + config.dir;
	runCommand(command);
	return cb();
});

gulp.task('mongo-stop', function(cb) {
	var command = 'mongo admin --eval ' + 'db.shutdownServer()';
	runCommand(command);
	return cb();
});