import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'

import Tabs, {Tab} from 'material-ui/Tabs'
import List from 'material-ui/List'
import Button from 'material-ui/Button'
import {CircularProgress} from 'material-ui/Progress'

import Container from '../layout/container'
import TopicListItem from './list-item'
import {tabs} from '../../util/variable-define'

@inject(stores => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.location.search) {
      this.props.topicStore.fetchTopics(nextProps.location.search)
    }
  }

  asyncBootstrap() {

  }

  getTab(search) {
    search = search || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  changeTab(e, value) {
    this.context.router.history.push({
      pathname: '/index',
      search: `?tab=${value},`
    })
  }

  listItemClick() {

  }

	render() {
    const {
      topicStore
    } = this.props

    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    const tab = this.getTab()

		return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is decription" />
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
        {
          Object.keys(tabs).map((t) => (
            <Tab key={t} label={tabs[t]} value={t}/>
          ))
        }
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '40px 0',
                }}
              >
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

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}
