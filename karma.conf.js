var webpackConfig = require('./webpack.config.js')
delete webpackConfig.entry
delete webpackConfig.plugins

webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  exclude: /node_modules|public\/dist\/|test/,
  loader: 'isparta'
})

webpackConfig.vue.loaders = {
  js: 'babel!isparta!standard'
}

webpackConfig.devtool = 'inline-source-map'

module.exports = function (karma) {
  karma.set({
    basePath: '',
    files: [
      'node_modules/es6-promise/dist/es6-promise.js',
      'test/index.js'
    ],
    frameworks: ['mocha', 'sinon-stub-promise', 'sinon', 'chai'],
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-chai',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-sinon',
      'karma-sinon-stub-promise'
    ],
    browsers: ['PhantomJS'], // 'Chrome', 'Safari', 'Firefox', 'Opera'
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
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
