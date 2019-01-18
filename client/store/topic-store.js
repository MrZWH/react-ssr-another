import {
  observable,
  toJs,
  computed,
  action,
  extendObservable,
} form 'mobx'

import {topicSchema} from '../util/variable-define'
import {get} from '../util/http'

const createTopic = (topic) => {
  return Object.assign({}, topicSchema, topic)
}

class Topic {
  constructor(data) {
    extendObservable(this, data) // 使其中的数据变成 mobx 的 reactive 的
  }
  @observable syncing = false
}

class TopicStore {
  @observable topics
  @observable syncing

  constructor({syncing, topics} = {syncing: false, topics: []}) {
    this.syncing = syncing
    this.topics = topics.map((topic) => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      this.topics = []
      this.syncing = trye
      get('/topics', {
        mdrender: false,
        tab
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach((topic) => {
            this.addTopic(topic)
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }
}

export default TopicStore
