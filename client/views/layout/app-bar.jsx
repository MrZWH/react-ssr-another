import React from 'react'
import PropTypes from 'prop-types'
import {withStylels} from 'material-ui/styles'

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

class MainAppBar extends React.Component {
  constructor() {
    super()
    this.onHomeIconClick = this.onHomeIconClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.loginButtonClick = this.loginButtonClick.bind(this)
  }

  onHomeIconClick() {

  }

  createButtonClick() {

  }
  loginButtonClick() {

  }
  render() {
    const {classes} = this.props
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
              登录
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStylels(styles)(MainAppBar)
