const express = require('express')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const bodyParser = require('body-parser')
const session = require('session')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends: false})) // 对应 http 请求里面 www-urlencoded 表单请求的不同方式，这个对应 formdata，这些配置方便我们使用 req.body 就能拿到数据

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUnitialized: false,
  secret: 'react cnode class'
}))

app.use(favicon(path.join(__dirname, '../favicon.jco')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

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
