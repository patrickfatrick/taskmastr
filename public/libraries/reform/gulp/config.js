var dest = './dist';
var src = './src';
var gutil = require('gulp-util');

module.exports = {
	build: {
		options: {
			sourceMaps: true
		},
		config: src + '/config.js',
		src: src + '/**/*.js',
		dest: dest + '/reform.js',
		min: {
			
		}
	},
	min: {
		options: {
			sourceMaps: true,
			minify: true
		},
		config: src + '/**/*.js',
		src: src + '/reform.js',
		dest: dest + '/reform.min.js'
		
	}
};