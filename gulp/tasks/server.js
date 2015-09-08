var gulp = require('gulp');
var gls = require('gulp-live-server');
var server = gls('./bin/www', {env: {NODE_ENV: 'development'}}, false);

gulp.task('server', function() {
  server.start();
});
