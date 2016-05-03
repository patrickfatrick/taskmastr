var gulp = require('gulp')

gulp.task('sync', ['mongo-start', 'nodemon', 'serve', 'animate', 'socket-io', 'webpack', 'watch'])
