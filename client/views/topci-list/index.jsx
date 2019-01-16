import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
  }
	render() {
		return (
      <div>{this.props.appState.msg}this is topicList</div>
		)
	}
}

TopicList.propTypes = {
  appState: PropTypes.object.isRequired
}
