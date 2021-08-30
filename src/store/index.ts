import { createStore, Store, useStore as useVuexStore } from 'vuex'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { IRootState, IStoreType } from './types'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'Mr.Long',
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules: {
    loginModule,
    systemModule
  }
})

//对Store做初始化（登录状态下刷新的话，store里的值会销毁问题）
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
  // 初始化的时候获取部门信息（放进modal.config里面）
  store.dispatch('getInitialDataAction')
}

//定义自己的useStore 类型为-->Root和模块的组合类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
