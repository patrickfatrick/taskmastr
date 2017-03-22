const webpack = require('webpack')
const merge = require('webpack-merge')
const fontAwesome = require('node-font-awesome')
const neat = require('node-neat')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./webpack.config.base')

module.exports = merge(base, {
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
            'resolve-url-loader',
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
      }, {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader!standard-loader',
              scss: ExtractTextPlugin.extract({
                use: [
                  { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
                  'resolve-url-loader',
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
            }
          }
        }]
      }
    ]
  }
})
