module.exports = {
	entry:"./entry.js",
	output:{
		path:"./lib/",
		filename:"bundle.js"
	},
	module: {
		loaders : [
			{
				test:/\.js$/,
				loader: 'babel-loader',
				query: {
					presets : ['es2015']
				}
			}
		]
	}
};
