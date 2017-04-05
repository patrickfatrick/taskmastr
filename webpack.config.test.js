const merge = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merge(base, {
  devtool: 'inline-source-map',
  module: {
    rules: [
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
      }
    ]
  }
})
