import { createStore } from 'vuex'
import loginModule from './login/login'
import { IRootState } from './types'

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
    loginModule
  }
})

//对Store做初始化（登录状态下刷新的话，store里的值销毁问题）
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

export default store
