var dest = './public/dist';
var src = './public';
var gutil = require('gulp-util');

module.exports = {
	sass: {
		src: src + './public/stylesheets/**/*.scss',
		dest: dest + '/stylesheets',
		settings: {
			config_file: './config.rb',
			css: dest + '/stylesheets',
			sass: src + '/stylesheets',
			sourcemap: true
		}
	},
	browserify: {
		settings: {
			transform: [['babelify', {
				compact: false
			}]]
		},
		src: [
			/*src + '/bower/jquery/dist/jquery.min.js',
			src + '/libraries/jquery-ui/jquery-ui.js',
			src + '/bower/lodash/lodash.min.js',
			src + '/bower/velocity/velocity.min.js',
			src + '/bower/moment/min/moment.min.js',
			src + '/libraries/date.js/dist/date.min.js',
			src + '/bower/angular-touch/angular-touch.min.js',
			src + '/bower/angular-animate/angular-animate.js',
			src + '/bower/angular-ui-date/src/date.js',
			src + '/bower/Sortable/Sortable.js',
			src + '/bower/Sortable/ng-sortable.js',*/
			src + '/javascripts/app.js'
		],
		dest: dest + '/javascripts',
		outputName: 'index.js',
		debug: gutil.env.type === 'dev'
	},
	jade: {
		src: '../views/*.jade'
	},
	watch: {
		src: [
			dest + '/stylesheets/**/*.*',
			src + '/javascripts/**/*.*',
			'../views/*.jade'
		],
		tasks: ['build']
	},
	nodemon: {
		script: 'bin/www',
		ext: 'js jade css',
		env: {
			NODE_ENV: 'development'
		},
		ignore: [
			'node_modules/**/*',
			'data/**/*',
			'.sass-cache/**/*',
			'public/**/*',
			'gulpfile.js',
			'gulp/**/*'
		]
	}
};