import React from 'react'
import PropTypes form 'prop-types'
import cx from 'classnames'

import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar'
import ListItemText from 'material-ui/List/ListItemText'
import Avatar from 'material-ui/Avatar'
import {withStyles} from 'material-ui/styles'

import {tabs} from '../../util/variable-define'

import {
  topicPrimaryStyle,
  topicSecondaryStyles,
} from './styles'

const Primary = ({classes, topic}) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top
  })
  return (
    <div className={classes.root}>
      <span className={classes.tab}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledSecondary = withStyles(topicSecondaryStyles)(Secondary)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const Secondary = ({classes, topic}) => (
  <span className={classes.root}>
    <span className={classes.username}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间{topic.create_at}</span>
  </span>
)

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const TopicListItem = ({onClick, topic}) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url}/>
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired
}

export default TopicListItem
