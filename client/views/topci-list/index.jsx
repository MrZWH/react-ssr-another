import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from 'material-ui/Button'

import Container from '../layout/container'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
  }
	render() {
		return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is decription" />
        </Helmet>
        {this.props.appState.msg}this is topicList
      </Container>
		)
	}
}

TopicList.propTypes = {
  appState: PropTypes.object.isRequired
}
