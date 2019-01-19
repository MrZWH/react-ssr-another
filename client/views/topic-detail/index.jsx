import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import {
  inject,
  observer,
} from 'mobx-react'

import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import {CircularProgress} from 'material-ui/Progress'

import Button from 'material-ui/Button'

import SimpleMDE from 'react-simplemde-editor'

import Container from '../layout/containers'

import {topicDetailStyle} from './styles'

import Reply form './reply'

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    user: stores.appState.user,
  }
}) @observer
class TopicDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      newReply: ''
    }
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this)
  }
  componentDidMount() {
    const id = this.getTopicId()
    this.props.topicStore.getTopicDetail(id)
  }

  getTopicId() {
    return this.props.match.params.id
  }

  handleNewReplyChange(value) {
    this.state({
      newReply: value
    })
  }

  render() {
    const {
      classes,
      user,
    } = this.props
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="accent" />
          </section>
        </Container>
      )
    }

    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{__html: marked(topic.content)}}></p>
          </section>
        </Container>
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${topic.last_reply_at}`}</span>
          </header>
            {
              user.isLogin ?
              <section className="replyEditor"><SimpleMDE
              onChange={this.handleNewReplyChange}
              value={this.state.newReply}
              options={{
                toolbar: false,
                autoFocus: false,
                spellChecker: false,
                placeholder: '添加您的精彩回复'
              }}
            /></section> : null
            }
            {
              !user.isLogin ?
                <section>
                  <Button raised color="accent" onClick={this.goToLogin}>
                    登录并进行回复
                  </Button>
                </section>
            }
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
