import { Module } from 'vuex'

import { accountLoginRequest, requestUserInfoById, requestUserMenuById } from '@/service/login/login'
import localCache from '@/utils/cache'

import { IAccount } from '@/service/login/types'
import { ILogoinState } from './types'
import { IRootState } from '../types'
import router from '@/router'

//Module<S, R>  S->模块中state的类型 R->跟store中state的类型
const loginModule: Module<ILogoinState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},

  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },

  actions: {
    //账号登录
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log('执行accountLoginAction', payload)
      //1.实现登录请求
      const LoginRes = await accountLoginRequest(payload)
      console.log(LoginRes.data.token)
      const { id, token } = LoginRes.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoRes = await requestUserInfoById(id)
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.请求用户菜单信息
      const userMenuRes = await requestUserMenuById(userInfo.role.id)
      const userMenus = userMenuRes.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.跳转首页
      router.push('./main')
    }

    //手机号登录
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
