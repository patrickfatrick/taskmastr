var dest = './public'

module.exports = {
  nodemon: {
    script: 'app.js',
    ext: 'js',
    env: {
      NODE_ENV: process.env.NODE_ENV
    },
    ignore: [
      'node_modules/**/*',
      'data/**/*',
      '.sass-cache/**/*',
      'public/**/*',
      'src/**/*',
      'gulpfile.js',
      'gulp/**/*',
      'views/**/*',
      'test/**/*',
      'coverage/**/*'
    ]
  },
  mongo: {
    dir: './data'
  },
  webpack: {
    contentBase: '.',
    publicPath: '/public/',
    hot: true,
    stats: { colors: true }
  },
  socketIO: {
    src: './node_modules/socket.io-client/**/*',
    dest: dest + '/javascripts/socket.io-client'
  }
}
