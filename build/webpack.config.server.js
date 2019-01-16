const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = webpackMerge(baseConfig, {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/server-entry.js')
	},
  externals: Object.keys(require('../package.json').dependencies)
	output: {
		filename: 'server-entry.js',
		libraryTarget: 'commonjs2' // 设置打包出来的文件使用的模块加载方案
	}
})
