const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
	return new Promise((resolve, reject) => {
		axios.get('http://localhost:8888/public/index.html')
			.then(res => {
				resolve(res.data)
			})
			.catch(reject)
	})
}

const Module = module.constructor

const mfs = new MemoryFs
// serverCompiler 可以监听 entry 下面依赖的文件是否有变化，一旦发生变化会重新去打包
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
	// stats 是webpack 在打包过程中输出的信息
	if (err) { throw err }
	stats = stats.toJson()
	stats.errors.foreach(err => console.error(err))
	stats.warings.foreach(warn => console.warn(warn))

	const bundlePath = path.join(
		serverConfig.output.path,
		serverConfig.output.filename
	)

	// 拿到的是 string 内容，在 js 模块不可用
	const bundle = mfs.readFileSync(bundlePath, 'utf-8')

	const m = new Module()
	m._compile(bundle, 'server-entry.js')
	serverBundle = m.exports.default
})


module.exports = (app) => {
	app.use('/public', proxy({
		target: 'http://localhost:8888'
	}))

	app.get('*', function (req, res) {
		getTemplate().then(template => {
			const content = ReactDomServer.renderToString(serverBundle)
			res.send(template.replace(('<!-- app -->'), content))
		})
	})
}
