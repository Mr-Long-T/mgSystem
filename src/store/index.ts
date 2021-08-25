import { createStore, Store, useStore as useVuexStore } from 'vuex'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'Mr.Long',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    loginModule,
    systemModule
  }
})

//对Store做初始化（登录状态下刷新的话，store里的值会销毁问题）
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

//定义自己的useStore 类型为-->Root和模块的组合类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
