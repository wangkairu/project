import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router/index'
import { msgBox } from './resetMessage'
const url = window.location.origin
// create an axios instance
const service = axios.create({
  // http://192.168.110.80:9090
  // http://192.168.1.17:9096
  // http://192.168.1.32:9096
  // http://192.168.1.109:9096
  // http://150.158.167.82:80
  // https://www.whdandgyy.cn/
  // 192.168.1.110:9096
  // 192.168.1.106   192.168.2.155/156/159 http://192.168.110.41:9096
  // 192.168.2.21  192.168.2.24
  baseURL:process.env.NODE_ENV === 'development' ? 'http://192.168.110.60:9096' : url
  // baseURL: url,
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})


// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    //登录成功后，需要把token添加到请求头当中，从今往后所有的请求当中都要带上这个token
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
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
    if (res.code === '401') {
      msgBox.dialog({
        type: 'warning',
        title: '确认退出',
        message: res.msg ? res.msg : '登陆过期,请重新登录',
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        callback() {
          // 处理各种登出逻辑
          removeToken()
          window.location.reload()
        }
      })
    }
    return res
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 1000
    // })
    return Promise.reject(error)
  }
)

export default service