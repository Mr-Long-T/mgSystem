<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="save-password">
      <el-checkbox v-model="isKeepPwd">保存密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="logoin-btn" @click="loginClick"
      >立即登录</el-button
    >
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
    //什么都不传 -->any类型
    //LoginAccount -->组件描述（类似于class）
    //typeof LoginAccount --> 拿到LoginAccount类型
    //InstanceType<T>  -->  拿到拥有构造函数的实例
    //才能通过accountRef拿到实例的属性和方法 --> accountRef.foo() 相当于LoginAccount.foo()
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    const loginClick = () => {
      // console.log('登录', accountRef.value)
      //判断是账号登录还是手机登录
      if (currentTab.value === 'account') {
        //? 有值调用
        accountRef.value?.loginAction(isKeepPwd.value)
      } else {
        console.log('phoneRef调用login-phone组件中loginAction方法')
      }
    }
    return {
      isKeepPwd,
      accountRef,
      phoneRef,
      currentTab,

      loginClick
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
