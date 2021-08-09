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

export default store
