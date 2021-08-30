import Request from '../../index'

import { IDataType } from '../../types'

// 查询获取
export function getPageListData(url: string, queryInfo: any) {
  return Request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除  url: /users/id
export function deletePageData(url: string) {
  return Request.delete<IDataType>({
    url: url
  })
}

// 创建
export function createPageData(url: string, newData: any) {
  return Request.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑
export function editPageData(url: string, editData: any) {
  return Request.patch<IDataType>({
    url: url,
    data: editData
  })
}
