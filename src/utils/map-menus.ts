import { RouteRecordRaw } from 'vue-router'

//将菜单映射带route数组里面，再将所有路由添加到children里面
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // webpack提供的工具，('加载某个文件夹', 是否递归查找, 匹配所定义文件)
  const routeFiles = require.context('../router/main', true, /\.ts/)

  //keys()返回string[]，包含所有文件路径
  routeFiles.keys().forEach((key) => {
    // console.log(key) //key ==> ./analysis/dashborad/dashboard.ts
    //../router/main  +   /xxx

    //拿到一个个模块放入allRoutes（路由对象）
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log('所有的路由allRoutes', allRoutes)

  // 2.根据菜单获取需要的routes
  // userMenus:
  // type === 1 --> children
  // type === 2 --> url --> route
  // 递归调用 取出route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        //匹配需要加载的路由
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
