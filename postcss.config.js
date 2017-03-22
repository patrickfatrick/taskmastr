const cssNext = require('postcss-cssnext')
const autoprefixer = require('autoprefixer')
const lost = require('lost')
const precss = require('precss')

module.exports = {
  plugins: [
    precss,
    cssNext,
    autoprefixer,
    lost
  ],
  sourceMap: 'inline'
}
