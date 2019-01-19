import React from 'react'
import PropTypes from 'prop-types'
import {withStylels} from 'material-ui/styles'
import {
  inject,
  observer,
} from 'mobx-react'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

import AppBar from 'material-ui/AppBar'
import ToolBar from 'material-ui/ToolBar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'

@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class MainAppBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.onHomeIconClick = this.onHomeIconClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.loginButtonClick = this.loginButtonClick.bind(this)
  }

  onHomeIconClick() {
    this.context.router.history.replace('/index?tab=all')
  }

  createButtonClick() {

  }
  loginButtonClick() {
    if (this.props.appState.user.isLogin) {
      this.context.router.history.replace('/user/info')
    } else {
      this.context.router.history.replace('/user/login')
    }
  }
  render() {
    const {classes} = this.props
    const {
      user,
    } = this.props.appState
    return (
      <div className="classes.root">
        <AppBar position='fixed'>
          <ToolBar>
            <IconButton color="contrast" onCLick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography className="classes.flex" type="title" color="inherit">
              JNode
            </Typography>
            <Button raised color="accent" onCLick={this.createButtonClick}>
              新建话题
            </Button>
            <Button color="contrast" onClick={this.loginButtonClick}>
              {
                user.isLogin ? user.info.loginname : '登录'
              }
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStylels(styles)(MainAppBar)
