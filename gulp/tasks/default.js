var gulp = require('gulp');
gulp.task('default', ['mongo-start', 'server', 'build', 'watch']);