<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from '@/store'
import PageSearch from '@/components/page-search'

import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch
  },
  setup() {
    // const store = useStore()

    // const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)

    // const propList = [
    //   { prop: 'name', label: '用户名', minWidth: '100' },
    //   { prop: 'realname', label: '真实姓名', minWidth: '100' },
    //   { prop: 'cellphone', label: '手机号码', minWidth: '100' },
    //   { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    //   {
    //     prop: 'createAt',
    //     label: '创建时间',
    //     minWidth: '250',
    //     slotName: 'createAt'
    //   },
    //   {
    //     prop: 'updateAt',
    //     label: '更新时间',
    //     minWidth: '250',
    //     slotName: 'updateAt'
    //   }
    // ]

    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
