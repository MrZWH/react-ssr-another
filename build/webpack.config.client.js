const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/', // 用以区分静态文件
	},
	module: {
		rules: [
			{
				enforce: 'pre', // 代码编译之前检查
				test: /.(js|jsx)$/,
				loader: 'eslint-loader',
				exclude: [
					path.join(__dirname, '../node_modules')
				]
			},
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
		new HTMLPlugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
}

if (isDev) {
	config.entry = {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, '../client/app.js')
		]
	}

	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		hot: true,
		overlay: {
			errors: true
		},
		publicPath: '/public/',
		historyApiFallback: {
			index: '/public/index.html' // 访问所有不存在页面都返回 index 页面
		}
	}

	config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config