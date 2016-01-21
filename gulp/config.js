var dest = './public/dist'
var src = './public'

module.exports = {
  build: {
    transform: [
      ['babelify', {
        compressed: false
      }],
      ['vueify']
    ],
    src: src + '/main.js',
    dest: dest + '/',
    outputName: 'bundle.js'
  },
  sass: {
    src: src + '/stylesheets/styles.scss',
    watch: 'public/stylesheets/*.scss',
    dest: dest + '/stylesheets',
    settings: {
      outputStyle: 'compressed'
    }
  },
  fonts: {
    dest: dest + '/fonts'
  },
  jade: {
    src: './views/**/*'
  },
  watch: {
    sass: {
      src: src + '/stylesheets/*.scss',
      tasks: ['styles']
    },
    jade: {
      src: './views/**/*',
      tasks: ['jade']
    }
  },
  nodemon: {
    script: 'bin/www',
    ext: 'js',
    env: {
      NODE_ENV: process.env.NODE_ENV
    },
    ignore: [
      'node_modules/**/*',
      'data/**/*',
      '.sass-cache/**/*',
      'public/**/*',
      'gulpfile.js',
      'gulp/**/*',
      'views/**/*'
    ]
  },
  mongo: {
    dir: './data'
  },
  notify: {
    sound: 'Submarine',
    icon: './public/images/iphone-icon.png'
  },
  webpack: {
    contentBase: '.',
    publicPath: '/public/dist/',
    hot: true,
    noInfo: true,
    stats: {colors: true}
  }
}
