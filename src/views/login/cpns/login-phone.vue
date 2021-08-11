<template>
  <div>
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>

      <el-form-item label="验证码" prop="verifyCode">
        <div class="get-code">
          <el-input v-model="phone.verifyCode" class="el_input" />
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      verifyCode: ''
    })

    return {
      phone
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .el_input {
    margin-right: 5px;
  }
}
</style>
