const webpack = require('webpack')
const merge = require('webpack-merge')
const fontAwesome = require('node-font-awesome')
const neat = require('node-neat')
const base = require('./webpack.config.base')

module.exports = merge(base, {
  entry: [ 'webpack/hot/dev-server' ],
  devtool: '#source-map',
  plugins: [ new webpack.HotModuleReplacementPlugin() ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: neat.with(fontAwesome.scssPath)
            }
          }
        ]
      }, {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader!standard-loader',
              scss: [
                'vue-style-loader',
                'style-loader',
                { loader: 'css-loader', options: { sourceMap: true } },
                'resolve-url-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                    includePaths: neat.with(fontAwesome.scssPath)
                  }
                }
              ]
            }
          }
        }]
      }
    ]
  }
})
