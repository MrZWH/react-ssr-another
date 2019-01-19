import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import UserLogin from '../views/user/login'

export default () => [
  <Route path="/" render={() => <Redirect to="/index"/>} key="first" exact/>,
  <Route path="/index" key="detail" component={TopicList} key="list"/>,
  <Route path="/detail/:id" component={TopicDetail}/>,
  <Route path="/user/login" component={UserLogin} key="login"/>,
]
