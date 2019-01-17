import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from 'material-ui/Button'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
  }
	render() {
		return (
      <div>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is decription" />
        </Helmet>
      {this.props.appState.msg}this is topicList</div>
		)
	}
}

TopicList.propTypes = {
  appState: PropTypes.object.isRequired
}
