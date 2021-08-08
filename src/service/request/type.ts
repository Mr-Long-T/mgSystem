import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//拦截器接口
export interface MyRequestInterceptors<T = AxiosResponse> {
  //请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  //请求错误拦截
  requestInterceptorCatch?: (error: any) => any
  //响应拦截
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

//对AxiosRequestConfig类型进行扩展
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>
  showLoading?: boolean
}
