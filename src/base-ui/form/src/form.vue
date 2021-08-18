<template>
  <div class="lt-form">
    <el-form label-width="100px">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :span="8">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <!-- <el-input :placeholder="item.placeholder"> -->
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    formItems: {
      // --> [{},{}] 需要确定一下数组里面存放什么类型元素
      type: Array as PropType<IFormItem[]>,
      //默认值是对象类型的话要写成箭头函数(不绑定this)
      defaut: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
