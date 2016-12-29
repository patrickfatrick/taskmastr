'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const neat = require('node-neat')
const fontAwesome = require('node-font-awesome')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main.js'
  ],
  output: {
    path: path.join(__dirname, '/public/'),
    publicPath: 'http://localhost:8888/public/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'standard'
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules\/(?!gregorian|harsh)|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!standard'
    }
  },
  babel: {
    presets: ['es2015', 'stage-2'],
    plugins: ['transform-runtime']
  },
  sassLoader: {
    includePaths: neat.with(fontAwesome.scssPath),
    outputStyle: 'compressed'
  }
  // ,
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     'Promise': 'imports?this=>global!exports?global.Promise!es6-promise/auto'
  //   })
  // ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = '/public/'
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('stylesheets/styles.css')
  ]
  module.exports.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap')
  })
} else {
  module.exports.devtool = '#source-map'
  module.exports.entry.unshift('webpack/hot/dev-server')
  module.exports.plugins = [ new webpack.HotModuleReplacementPlugin() ]
  module.exports.module.loaders.push({
    test: /\.scss$/,
    loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
  })
}
