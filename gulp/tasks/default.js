var gulp = require('gulp')

gulp.task('default', ['eslint-watch', 'mongo-start', 'nodemon', 'socket-io', 'webpack'])
