import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  params = params || {}
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params.key}&`
    return result
  }, '') // 不设默认值会使 第一个 result 使 undefined
  return `${baseUrl}/api/${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then((resp) => {
        const {
          data,
        } = resp
        if (data && data.success === true) {
          resolve(data)
        }
      })
      // .catch((err) => {
      //   if (err.response) {
      //     reject(err.response.data)
      //   } else {
      //     reject({
      //       success: false,
      //       err_mag: err.message,
      //     })
      //   }
      // })
      .catch(reject)
  })
}


export const post = (url, params, datas) => {
  return new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), datas)
      .then((resp) => {
        const {
          data,
        } = resp
        if (data && data.success === true) {
          resolve(data)
        }
      })
      .catch(reject)
  })
}
