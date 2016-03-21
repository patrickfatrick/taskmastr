var gulp = require('gulp')

gulp.task('default', ['mongo-start', 'serve', 'webpack', 'watch'])
