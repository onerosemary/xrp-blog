/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import { Message } from 'element-ui'  //引用饿了么UI消息组件
import {productURI} from '../config'
import axios from 'axios' //引用axios
import cookies from 'js-cookie'

// const productURI = 'https://www.xiangruiping.cn/api'
const URI = process.env.NODE_ENV === 'production' ? productURI+'/api' : "/api"


// create an axios instance
const service = axios.create({
  baseURL: URI, // 所有异步请求都加上/api,nginx转发到后端Springboot
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['-Token'] = getToken()
    if(process.server === false && cookies.get('blog_token')) { // 客户端
      config.headers.Authorization = cookies.get('blog_token')
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
  response => {
    const res = response.data //res is my own data
    if (res.code === 0) {
      return res
    }else {
      Message({
        message: res.msg || Object.values(res.errors)[0] || 'Error',
        type: 'error',
        duration: 1000
      })
      return Promise.reject(new Error(res.msg || Object.values(res.errors)[0] || 'Error'))
    }
  },
  error => {

    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service //导出封装后的axios