'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const neat = require('node-neat')
const bourbon = require('node-bourbon')
const fontAwesome = require('node-font-awesome')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main.js'
  ],
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
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader!standard-loader'
            }
          }
        }]
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules\/(?!gregorian|harsh)|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
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

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = '/public/'
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin('stylesheets/styles.css')
  )
  module.exports.module.rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      use: [
        { loader: 'css-loader' },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: neat.with(fontAwesome.scssPath),
            outputStyle: 'compressed'
          }
        }
      ]
    })
  })
} else {
  module.exports.devtool = '#source-map'
  module.exports.entry.unshift('webpack/hot/dev-server')
  module.exports.plugins = [ new webpack.HotModuleReplacementPlugin() ]
  module.exports.module.rules.push({
    test: /\.scss$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'resolve-url-loader' },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: bourbon.with(neat.with(fontAwesome.scssPath)),
          outputStyle: 'compressed'
        }
      }
    ]
  })
}
