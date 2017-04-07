module.exports = {
	entry : './js/main.js',
	output: {
		path: './lib',
		filename: 'main.bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			//exclude : /node_modules/,
			loader: 'babel-loader'
		}]
	}
}
