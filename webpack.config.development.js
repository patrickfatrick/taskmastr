const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = merge(base, {
  entry: [
    'webpack/hot/dev-server',
    'babel-polyfill',
    './src/main.js'
  ],
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StylelintPlugin({
      files: [ 'src/stylesheets/*.css', '**/*.vue' ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      }, {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader!eslint-loader',
              postcss: [
                'vue-style-loader',
                'style-loader',
                'css-loader?importLoaders=1',
                'postcss-loader'
              ]
            }
          }
        }]
      }
    ]
  }
})
