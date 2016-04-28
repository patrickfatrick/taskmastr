var gulp = require('gulp')

gulp.task('default', ['mongo-start', 'serve', 'animate', 'socket-io', 'webpack', 'watch'])
