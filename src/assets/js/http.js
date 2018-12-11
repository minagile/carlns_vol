import axios from 'axios'
import router from '../../router'
import qs from 'qs'
import { Message } from 'element-ui'

axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://192.168.1.128:80' // 彭
// axios.defaults.baseURL = 'http://192.168.1.145:80'
// axios.defaults.baseURL = 'http://192.168.1.136:80'
// axios.defaults.baseURL = 'http://192.168.1.140:80'
axios.defaults.baseURL = 'http://192.168.1.117:80'
// axios.defaults.baseURL = 'http://www.easyfq.com/carins'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    // config.data = JSON.stringify(config.data)
    config.headers = {
      'token': token,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      // 'Content-Type': 'application/json; charset=UTF-8'
    }
    // if (token) {
    //   config.params = { 'token': token }
    // }
    return config
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 101) {
      Message({
        message: response.data.msg,
        type: 'info'
      })
      router.push({
        path: '/',
        querry: { redirect: router.currentRoute.fullPath }
        // 从哪个页面跳转
      })
    }
    if (response.data.code === 102) {
      Message({
        message: response.data.msg,
        type: 'info'
      })
      router.push({
        path: '/MLogin',
        querry: { redirect: router.currentRoute.fullPath }
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
*/

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
*/

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, qs.stringify(data)).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const Req = axios.defaults.baseURL

// PostFlie(url, data) {
//   return new Promise((resolve, reject) => {
//     //根据data对象生成FormData对象
//     var temp = new FormData();
//     for (var t in data) {
//       temp.append(t, data[t]);
//     }
//     axios.post(url, temp).then((res) => {
//       if (res) {
//           resolve(res.Data);
//       }
//     }).catch((error) => {
//       reject(error);
//     })
//   })
// }
