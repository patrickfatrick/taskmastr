'use strict'

const webpack = require('webpack')
const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '/public/'),
    publicPath: 'http://localhost:8888/public/',
    filename: 'javascripts/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [ 'standard-loader' ]
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ]
}
