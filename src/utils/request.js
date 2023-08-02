import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router/index'
import { msgBox } from './resetMessage'
// create an axios instance
const service = axios.create({
  // http://192.168.3.17:9090
  baseURL: "https://www.whdandgyy.cn/", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    //登录成功后，需要把token添加到请求头当中，从今往后所有的请求当中都要带上这个token
    let token = store.state.user.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '0') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === '401') {
        // to re-login
        msgBox.dialog({
          type: 'warning',
          title: '确认退出',
          message: res.msg ? res.msg : '登陆过期,请重新登录',
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          callback() {
            // 处理各种登出逻辑
            removeToken()
            location.reload()

          }
        })
      }
      return res
    } else {
      Message({
        message: res.msg,
        type: 'success',
        duration: 5 * 1000
      })
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service