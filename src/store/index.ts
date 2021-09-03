import { createStore, Store, useStore as useVuexStore } from 'vuex'
import loginModule from './login/login'
import systemModule from './main/system/system'
import dashboardModule from './main/analysis/dashboard'

import { IRootState, IStoreType } from './types'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'Mr.Long',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      // 在未拿到token之前请求数据的话会出问题、不能直接调用
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

      // 2.请求菜单数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})

//对Store做初始化（登录状态下刷新的话，store里的值会销毁问题）
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')

  // 初始化的时候获取部门信息（放进modal.config里面）
  // 为了防止在获取token前发送数据请求，不能直接调用，在loginModule中调用
  // store.dispatch('getInitialDataAction')
}

//定义自己的useStore 类型为-->Root和模块的组合类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
