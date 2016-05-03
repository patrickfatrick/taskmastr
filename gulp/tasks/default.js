var gulp = require('gulp')

gulp.task('default', ['mongo-start', 'nodemon', 'animate', 'socket-io', 'webpack'])
