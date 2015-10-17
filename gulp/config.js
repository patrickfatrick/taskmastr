var dest = './public/dist';
var src = './public';
var gutil = require('gulp-util');

module.exports = {
	sass: {
		src: src + '/stylesheets/styles.scss',
		watch: 'public/stylesheets/*.scss',
		dest: dest + '/stylesheets',
		settings: {
			outputStyle: 'compressed'
		}
	},
	systemjs: {
		options: {
			sourceMaps: true,
			minify: false //set to true for production
		},
		config: src + '/config.js',
		src: src + '/javascripts/app.js',
		watch: 'public/javascripts/**/*',
		dest: dest + '/javascripts/index.js'
	},
	jade: {
		src: './views/**/*'
	},
	watch: {
		sass: {
			src: src + '/stylesheets/*.scss',
			tasks: ['styles']
		},
		systemjs: {
			src: 'public/javascripts/**/*',
			tasks: ['systemjs']
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
			NODE_ENV: 'development'
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
	}
};
