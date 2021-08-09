import Request from '../index'

import { IAccount, IDataType, ILoginRes } from './types'

//一个登录模块可能有多个url
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // --> /users/id
  UserMenus = '/role/' // -->/role/id/menu
}

//1.请求登录信息
export function accountLoginRequest(account: IAccount) {
  return Request.post<IDataType<ILoginRes>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

//2.请求用户信息
export function requestUserInfoById(id: number) {
  return Request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

//2.请求用户菜单信息
export function requestUserMenusById(id: number) {
  return Request.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
