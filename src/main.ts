import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'

// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'

// import Request from './service'

const app = createApp(App)
// app.use(ElementPlus)

registerApp(app)

app.use(router).use(store)

//每次刷新时，初始化store
setupStore()

app.mount('#app')

//请求1
// Request.request({
//   url: '/home/multidata',
//   method: 'GET',
//   //自定义请求拦截
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// 请求2
// Request.request<DataType>({
//   url: '/home/multidata',
//   method: 'GET',
//   //根据需求是否显示正在加载   (需要对类型做扩展)
//   showLoading: true
// }).then((res) => {
//   console.log(res.data)
//   console.log(res.returnCode)
//   console.log(res.success)
// })
