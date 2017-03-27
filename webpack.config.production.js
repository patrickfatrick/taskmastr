const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./webpack.config.base')

module.exports = merge(base, {
  entry: [
    'babel-polyfill',
    './src/main.js'
  ],
  output: {
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new ExtractTextPlugin('stylesheets/styles.css')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?importLoaders=1&sourceMap=true&minimize=true',
            'postcss-loader'
          ]
        })
      }, {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader!standard-loader',
              scss: ExtractTextPlugin.extract({
                use: [
                  'css-loader?importLoaders=1&sourceMap=true&minimize=true',
                  'postcss-loader'
                ]
              })
            }
          }
        }]
      }
    ]
  }
})
