var dest = './public/dist';
var src = './public';
var gutil = require('gulp-util');

module.exports = {
	sass: {
		src: src + '/stylesheets/styles.scss',
		dest: dest + '/stylesheets',
		settings: {
			outputStyle: 'compressed'
		}
	},
	systemjs: {
		options: {
			sourceMaps: true,
			minify: true
		},
		config: src + '/config.js',
		src: src + '/javascripts/app.js',
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
			src: src + '/javascripts/**/*',
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
	}
};