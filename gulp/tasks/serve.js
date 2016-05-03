var gulp = require('gulp')
var browserSync = require('browser-sync')
var browserSyncConfig = require('../config').watch

gulp.task('serve', function () {
  browserSync.init({
    open: false,
    proxy: 'http://localhost:3000',
    files: [browserSyncConfig.sass.src],
    port: 9000
  })
})
