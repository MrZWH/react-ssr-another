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
  @observable details

  constructor({syncing = false, topics = [], details = []} = {}) {
    this.syncing = syncing
    this.topics = topics.map((topic) => new Topic(createTopic(topic)))
    this.details = details.map((detail) => new Topic(createTopic(detail)))

  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
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

  @action  getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data))
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        }).catch(reject)
      }
    })
  }
}

export default TopicStore
