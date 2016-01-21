var gulp = require('gulp')
var browserSync = require('browser-sync')
var nodemon = require('gulp-nodemon')
var config = require('../config').nodemon
var browserSyncConfig = require('../config').watch

gulp.task('serve', ['nodemon'], function () {
  browserSync.init({
    open: false,
    proxy: 'http://localhost:3000',
    files: [browserSyncConfig.sass.src],
    port: 9000
  })
})

gulp.task('nodemon', function (cb) {
  var started = false

  return nodemon(config)
  .on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb()
      started = true
    }
  })
})
