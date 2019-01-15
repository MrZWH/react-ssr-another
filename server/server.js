const express = require('express')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(favicon(path.join(__dirname, '../favicon.jco')))

if (!isDev) {
	const serverEntry = require('../dist/server-entry').default
	const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
	// 需要为静态文件的请求做处理，不然 不论是请求 .js 哈市什么都会返回下面的设置的 html 内容
	app.use('/public', express.static(path.join(__dirname, '../dist')))

	app.get('*', function (req, res) {
		const appString = ReactSSR.renderToString(serverEntry)

		res.send(template.replace(('<!-- app -->'), appString))
	})
} else {
	const devStatic = require('./util/dev-static')
	devStatic(app)
}

app.listen(3333, function () {
	console.log('server is listening on 3333')
})
