import Request from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return Request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
