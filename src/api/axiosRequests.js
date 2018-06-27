import axios from 'axios'
import { stringify } from 'querystring'

axios.defaults.baseURL = ''
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.headers.common['Authorization'] = ''

const fetch = (url, options) => {
  const { method = 'GET', data } = options
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data })
    case 'delete':
      return axios.delete(url, { data })
    case 'post':
      return axios.post(url, stringify(data))
    case 'put':
      return axios.put(url, stringify(data))
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  const error = new Error(res.statusText)
  error.response = res
  throw error
}

function handleData(res) {
  const data = res.data
  if (data && data.msg && data.success) {
    // do something with data
    return data
  }
}

function handleError(error) {
  const data = error.response.data
  // show global error message
  return { success: false, data: data }
}

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(handleData)
    .catch(handleError)
}

export function get(url, options) {
  return request(url, { ...options, method: 'get' })
}

export function post(url, options) {
  return request(url, { ...options, method: 'post' })
}

export function put(url, options) {
  return request(url, { ...options, method: 'put' })
}

export function deleted(url, options) {
  return request(url, { ...options, method: 'delete' })
}
