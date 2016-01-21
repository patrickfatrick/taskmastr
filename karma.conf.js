var webpackConfig = require('./webpack.config.js')
delete webpackConfig.entry

webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  exclude: /node_modules|public\/dist\//,
  loader: 'isparta'
})

module.exports = function (karma) {
  karma.set({
    basePath: '',
    files: ['test/index.js'],
    frameworks: ['mocha', 'chai'], // 'mocha', 'chai'
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher'
    ],
    browsers: ['PhantomJS'], // 'Chrome', 'Safari', 'Firefox', 'Opera'
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['coverage', 'mocha'],
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
    loggers: [{type: 'console'}]
  })
}
