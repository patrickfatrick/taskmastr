var webpack = require('webpack');

module.exports = {
	entry: [
		'./public/main.js'
	],
	output: {
		path: __dirname + '/public/dist/',
		publicPath: 'http://localhost:8080/public/dist/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			// excluding some local linked packages.
			// for normal use cases only node_modules is needed.
			exclude: /node_modules\/(?!gregorian)|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
			loader: 'babel!eslint'
		}]
	},
	vue: {
		loaders: {
			js: 'babel!eslint'
		}
	},
	babel: {
		presets: ['es2015', 'stage-2'],
		plugins: ['transform-runtime']
	},
	plugins: [
		new webpack.ProvidePlugin({
			'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	]
};

if (process.env.NODE_ENV === 'production') {
	module.exports.output.publicPath = '/public/dist/';
	module.exports.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	];
} else {
	module.exports.devtool = '#source-map';
	module.exports.entry.unshift('webpack/hot/dev-server');
	module.exports.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}
