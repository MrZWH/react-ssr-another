const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public', // 用以区分静态文件
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
	},
	plugins: [
		new HTMLPlugin(
			template: path.join(__dirname, '../client/template.html')
		)
	]
}