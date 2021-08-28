import { ref } from 'vue'
import PageContent from '@/components/page-content'

//公共方法 搜索/重置
export function usePageSearch() {
  //拿到pageContent组件对象 后调用对象里的getPageData方法 -->发送网络请求
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    //重置-->无参调用
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    //参数-->查询条件
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
