const ReactDomServer = require('react-dom/server')
const asyncBootstrapper = require('react-async-bootstrapper').default
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default

const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('material-ui/styles').createMuiTheme
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default
const color = require('material-ui/colors')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }. {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default

    const routerContext = {}
    const stores = createStoreMap()
    const sheetsRegistry = new SheetsRegistry
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName
    const theme = createMuiTheme({
      palette: {
        primary: colors.linghtBule,
        accent: colors.pink,
        type: 'light'
      }
    })
    const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url)

    asyncBootstrapper(app).then(() => {
      const content = ReactDomServer.renderToString(app)

      // 当 router 有 redirect 的时候会在 routerContext 上添加 rul
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
        materialCss: sheetsRegistry.toString()
      })
      res.send(html)
      // res.send(template.replace(('<!-- app -->'), content))
      resolve()
    }).catch(reject)

  })
}