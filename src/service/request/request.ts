import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestInterceptors, RequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

//可以创建多个实例
class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  //扩展前:constructor(config: AxiosRequestConfig)
  constructor(config: RequestConfig) {
    //每次创建新的instance
    this.instance = axios.create(config)
    //保存传入的config中拦截器
    this.interceptors = config.interceptors
    //保存传入的config中showLoading(可选类型,没传给定默认值)
    this.showLoading = config.showLoading ?? false

    //对应实例传入不同的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //定义所有实例的拦截器（全局）
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有请求拦截，成功')

        //如果showLoading为true
        if (this.showLoading) {
          //拦截请求 显示加载
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载',
            background: 'rgba(0, 0, 0, .5)'
          })
        }

        return config
      },
      (err) => {
        console.log('所有请求拦截，失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有响应拦截，成功')

        //移除loding
        setTimeout(() => {
          this.loading?.close()
        }, 500)

        //拦截器做了一层封装、res.data拿到想要的数据
        const data = res.data
        //服务器返回的失败处理信息：200 -->成功，但返回{data: "", success:false, returnCode:-1001}
        if (data.returnCode === '-1001') {
          console.log('请求失败！，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有响应拦截，失败')
        //例子
        if (err.response.status === 404) {
          console.log('404')
        }
        return err
      }
    )
  }

  //根据单独请求config中是否传入hook
  request<T>(config: RequestConfig<T>): Promise<T> {
    //让外部拿到数据
    return new Promise((resolve, reject) => {
      //有无传入requestInterceptor
      if (config.interceptors?.requestInterceptor) {
        //更新config
        config = config.interceptors.requestInterceptor(config)
      }

      //请求完成后：取出res后，判断有无传入responseInterceptor
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            //更新res
            res = config.interceptors.responseInterceptor(res)
          }
          console.log(res)
          //请求完成后将showLoading 转为false
          this.showLoading = false

          //将结果返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = false
          reject(err)
          return err
        })

      //showLoading
      if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }
    })
  }
}

export default MyRequest
