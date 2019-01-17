import React from 'react'
import {StaticRouter} from 'react-router-dom'
import {Provide, useStaticRendering} from 'mobx-react'
import {JssProvider} from 'react-jss'
import {MuiThemeProvider} from 'material-ui/styles'

import App from './views/App.jsx'
import {createStoreMap} from './store/store'

// 让 mobx 在服务端渲染的时候不会重复的数据变换
useStaticRendering(true)

export default (store, routerContext, sheetsRegistry, jss, theme, url) => (
  <Provide {...store}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme}>
          <App/>
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provide>
)

export {createStoreMap}
