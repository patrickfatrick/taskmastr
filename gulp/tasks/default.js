var gulp = require('gulp')

gulp.task('default', ['mongo-start', 'nodemon', 'socket-io', 'webpack'])
