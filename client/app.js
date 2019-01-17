import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'mobx-react'
import  {AppContainer} from 'react-hot-loader' // eslint-disable-line
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {lightBlue, pink} from 'material-ui/colors'

import App from './views/App'
import AppState from './store/app.state'

// 设置 mater-ui 的主题色
const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light'
  }
})

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

const createApp = (TheApp) => {
  class Main extends React.Component {
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render() {
      return <TheApp {...this.props}/>
    }
  }

  return Main
}

const root = document.getElementById('root')

const render = Component => {
	ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component/>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
	)
}

render(createApp(App))

if (module.hot) {
	module.hot.accept('./views/App', () => {
		const NextApp = require('./views/App').default // eslint-disable-line
		render(createApp(NextApp))
	})
}
