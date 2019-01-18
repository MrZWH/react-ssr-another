import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Tabs, {Tab} from 'material-ui/Tabs'
import List from 'material-ui/List'
import Button from 'material-ui/Button'
import {CircularProgress} from 'material-ui/Progress'

import Container from '../layout/container'
import TopicListItem from './list-item'

@inject(stores => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      tabIndex: 0
    }
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
  }

  componentDidMount() {
    this.props.topicStore.fetchTopics()
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

    const {
      topicStore
    } = this.props

    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing

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
        <List>
          {
            topicList.map((topic) => (
              <TopicListItem
                key={topic.id}
                onClick={this.listItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics ?
            (
              <div>
                <CircularProgress color="accent" size={100}/>
              </div>
            ) : null
        }
      </Container>
		)
	}
}

TopicList.wrappedComonent.propTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
}

