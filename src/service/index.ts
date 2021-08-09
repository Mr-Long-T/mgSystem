// service 统一出口
import MyRequest from './request/request'
import { BASE_URL, TIME_OUT } from './request/envConfig'

import localCache from '@/utils/cache'

//保证每次创建的MyRequest实例不同
const Request = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //对应一个一个拦截器
  interceptors: {
    requestInterceptor: (config) => {
      //实例的token（全局写的话，全局都携带同一个token）
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求成功拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

// const ltRequest2 = new MyRequest({
//   baseURL: '地址2'
// })

export default Request
