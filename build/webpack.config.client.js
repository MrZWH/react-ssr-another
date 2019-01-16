const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js'
	},
	plugins: [
		new HTMLPlugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
})

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
		},
    proxy: {
      '/api': 'http://localhost:3333'
    }
	}

	config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
