'use strict'

const webpackConfig = require('./webpack.config.test.js')

module.exports = function (karma) {
  karma.set({
    basePath: '',
    files: [
      'node_modules/babel-polyfill/browser.js',
      'public/javascripts/socket.io-client/dist/socket.io.js',
      'test/index.js'
    ],
    frameworks: [ 'mocha', 'sinon', 'chai' ],
    browsers: [ 'PhantomJS' ], // 'Chrome', 'Safari', 'Firefox', 'Opera'
    preprocessors: {
      'test/index.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: [ 'coverage', 'spec' ],
    coverageReporter: {
      reporters: [
        {
          type: 'lcov',
          dir: 'coverage'
        },
        {
          type: 'text'
        }
      ]
    },
    port: 9876,
    logLevel: karma.LOG_INFO,
    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 30000,
    colors: true,
    loggers: [ { type: 'console' } ]
  })
}
