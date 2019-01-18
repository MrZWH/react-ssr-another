import React from 'react'
import Routes from '../config/router.jsx'

import AppBar from './layout/app-bar'

export default class App extends React.Component {
	render() {
		return [
      <AppBar />
      <Routes key="routes" />,
		]
	}
}
