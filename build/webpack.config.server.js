const path = require('path')

module.exports = {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/server-entry.js')
	},
	output: {
		filename: 'server-entry.js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public',
		libraryTarget: 'commonjs2' // 设置打包出来的文件使用的模块加载方案
	},
	module: {
		rules: [
			{
				test: /.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: [
					path.join(__dirname, '../node_modules')
				]
			}
		]
	}
}