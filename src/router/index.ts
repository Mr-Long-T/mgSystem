import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '../utils/cache'

import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] --> 根据userMenus来决定
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  //非登录状态,跳转到登录页
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // console.log(router.getRoutes())
  // //即将跳转的对象
  // console.log(to)

  //跳转到menu中第一项
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
