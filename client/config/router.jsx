import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/index"/>} key="first" exact/>,
  <Route path="/index" key="detail" component={TopicList} key="list"/>,
  <Route path="/detail/:id" component={TopicDetail}/>,
]
