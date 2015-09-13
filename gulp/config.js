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
	dependencies: {
		src: [
		src + '/bower/jquery/dist/jquery.min.js',
		src + '/libraries/jquery-ui/jquery-ui.js',
		src + '/bower/lodash/lodash.min.js',
		src + '/bower/velocity/velocity.min.js',
		src + '/bower/moment/min/moment.min.js',
		src + '/libraries/date.js/dist/date.min.js',
		src + '/bower/angular/angular.min.js',
		src + '/bower/angular-touch/angular-touch.min.js',
		src + '/bower/angular-animate/angular-animate.js',
		src + '/bower/angular-ui-date/src/date.js',
		src + '/bower/Sortable/Sortable.js',
		src + '/bower/Sortable/ng-sortable.js',
		src + '/bower/angular-hotkeys/build/hotkeys.min.js'
		],
		dest: dest + '/javascripts/dependencies.js'
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
			'gulp/**/*',
			'views/**/*'
		]
	}
};