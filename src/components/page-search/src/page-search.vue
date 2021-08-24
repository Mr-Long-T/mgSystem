<template>
  <div class="page-search">
    <lt-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary" icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </template>
    </lt-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LtForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: {
    LtForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

    return {
      formData
    }
  }
})
</script>

<style scoped>
.header {
  color: rgb(2, 226, 159);
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
