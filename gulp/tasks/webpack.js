var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('../../webpack.config')
var config = require('../config').webpack

gulp.task('webpack', function () {
  // Start a webpack-dev-server
  var compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, config).listen(8080, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    // Server listening
    gutil.log('[webpack-dev-server]', 'Listening on port 8080.')
  })
})
