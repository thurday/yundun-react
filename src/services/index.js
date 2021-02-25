import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'
console.log(window.ip);

const gen = params => {
  let url = window.ip + params
  let method = 'POST'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = window.ip + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

export default APIFunction
