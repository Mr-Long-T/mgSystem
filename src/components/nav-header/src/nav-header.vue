<template>
  <div class="nav-header">
    <!-- 折叠图标 -->
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="foldClick"
    ></i>
    <div class="content">
      <!-- 面包屑 -->
      <lt-breadcrumb :breadcrumbs="breadcrumbs" />
      <!-- 个人信息 -->
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import LtBreadcrumb from '@/base-ui/breadcrumb'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    LtBreadcrumb
  },
  emits: ['foldChange'],
  //将foldChange事件传给父组件，再来控制menus的收缩
  setup(props, { emit }) {
    const isFold = ref(false)
    const foldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //面包屑数据： [{name:xxx, path:xxx},{}]
    const store = useStore()
    //使用computed 使数据在路由或者菜单发生改变时改变
    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      foldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    // 光标属性
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 10px;
  }
}
</style>
