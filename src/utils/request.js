import { cloneDeep } from 'lodash'
import { message } from 'antd'
import axios from 'axios'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import pathToRegexp from 'path-to-regexp'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  console.log('options', options)
  let { url, data, method = 'get' } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-Z]+:\/\/[^/]*/)
    if (urlMatch) {
      console.log('urlMatch', urlMatch)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
  } catch (e) {
    message.error(e.message)
  }

  if (method.toUpperCase() === 'GET') {
    options.params = cloneData
  } else {
    options.data = cloneData
  }
  options.url = url
  // options.params = cloneData
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options).then(response => {
    const { statusText, status, data } = response

    let result = {}
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        result.list = data
      } else {
        result = data
      }
    } else {
      result.data = data
    }

    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...result
    })
  }).catch(error => {
    const { response, message } = error

    if (String(message) === CANCEL_REQUEST_MESSAGE) {
      return {
        success: false
      }
    }

    let msg
    let statusCode

    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }


    return Promise.reject({
      success: false,
      statusCode,
      message: msg
    })
  })
}
