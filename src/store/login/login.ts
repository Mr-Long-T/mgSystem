import { Module } from 'vuex'

import { ILogoinState } from './types'
import { IRootState } from '../types'

//Module<S, R>  S->模块中state的类型 R->跟store中state的类型
const loginModule: Module<ILogoinState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {},
  getters: {},
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log('执行accountLoginAction', payload)
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction', payload)
    }
  }
}

export default loginModule
