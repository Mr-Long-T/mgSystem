<template>
  <div class="user">
    <div class="search">
      <lt-form :formItems="formItems" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LtForm, { IFormItem } from '@/base-ui/form'

export default defineComponent({
  name: 'user',
  components: {
    LtForm
  },
  setup() {
    const formItems: IFormItem[] = [
      {
        type: 'input',
        label: '用户名',
        rules: [],
        placeholder: '请输出用户名'
      },
      {
        type: 'input',
        label: '密码',
        placeholder: '请输出密码'
      },
      {
        type: 'input',
        label: '用户名',
        rules: [],
        placeholder: '请输出用户名'
      }
    ]
    return {
      formItems
    }
  }
})
</script>

<style scoped></style>
