var gulp = require('gulp')

gulp.task('default', ['mongo-start', 'rethinkdb', 'serve', 'webpack', 'watch'])
