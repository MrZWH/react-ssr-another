import React from 'react'
import {StaticRouter} from 'react-router-dom'
import {Provide, useStaticRendering} from 'mobx-react'
import App from './views/App.jsx'

import {createStoreMap} from './store/store'

// 让 mobx 在服务端渲染的时候不会重复的数据变换
useStaticRendering(true)

export default (store, routerContext, url) => (
  <Provide {...store}>
    <StaticRouter context={routerContext} location={url}>
      <App/>
    </StaticRouter>
  </Provide>
)

export {createStoreMap}
