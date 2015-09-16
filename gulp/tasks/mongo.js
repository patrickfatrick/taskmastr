var gulp = require('gulp');
var exec = require('child_process').exec
//var mkdirs = require('mkdirs');
var config = require('../config').mongo;
var notify = require('gulp-notify');

var runCommand = function(command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
}

/*gulp.task('mongo', function () {
	exec('mongod --dbpath ' + config.dir, function (err, stdout, stderr) {
		console.log(stdout);
		notify('Starting MongoDB...');
	})
});*/

gulp.task("mongo-start", function() {
  var command = "mongod --dbpath " + config.dir;
  runCommand(command);
});

gulp.task("mongo-stop", function() {
  var command = 'mongo admin --eval "db.shutdownServer();"'
  runCommand(command);
});