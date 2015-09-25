var gulp = require('gulp');
var exec = require('child_process').exec

var runCommand = function(command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
}

gulp.task("jest", function(cb) {
  var command = 'npm test';
  runCommand(command);
	return cb();
});