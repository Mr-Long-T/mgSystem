<template>
  <div>
    <el-dropdown class="el-dropdown">
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="circleUrl"></el-avatar>
        <!-- <span class="name">{{ name }}</span> -->
        <span class="name">admin</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item disabled>无法选中</el-dropdown-item>
          <el-dropdown-item divided @click="handleExitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.loginModule.userInfo.name)
    const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

    const router = useRouter()
    const handleExitClick = () => {
      localCache.removeCahe('token')
      router.push('/main')
    }
    return {
      name,
      circleUrl,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  .name {
    margin-left: 5px;
  }
}
</style>
