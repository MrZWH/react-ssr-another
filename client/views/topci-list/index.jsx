import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Tabs, {Tab} from 'material-ui/Tabs'
import Button from 'material-ui/Button'

import Container from '../layout/container'
import TopicListItem from './list-item'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      tabIndex: 0
    }
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
  }

  changeTab(e, index) {
    this.setState({
      tabIndex: index
    })
  }

  listItemClick() {

  }

	render() {
    const {
      tabIndex,
    } = this.state

    const topic = {}
		return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is decription" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部"/>
          <Tab label="分享"/>
          <Tab label="工作"/>
          <Tab label="回答"/>
          <Tab label="精品"/>
          <Tab label="测试"/>
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
      </Container>
		)
	}
}

TopicList.propTypes = {
  appState: PropTypes.object.isRequired
}
