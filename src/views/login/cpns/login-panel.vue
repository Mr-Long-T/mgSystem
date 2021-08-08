<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="save-password">
      <el-checkbox v-model="isKeepPwd">保存密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="logoin-btn" @click="loginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },

  setup() {
    const isKeepPwd = ref(true)
    //什么都不传any类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const loginClick = () => {
      console.log('登录', accountRef.value)
      //? 有值调用 
      accountRef.value?.loginAction()
    }
    return {
      isKeepPwd,
      loginClick,
      accountRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 120px;
  width: 400px;

  .title {
    text-align: center;
  }

  .save-password {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .logoin-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
