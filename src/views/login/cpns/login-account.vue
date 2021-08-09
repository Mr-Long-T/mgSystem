<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'

import localCache from '../../../utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const store = useStore()

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPwd: boolean) => {
      //validate ==> 验证(格式) ==> 返回valid(成功或失败)
      formRef.value?.validate((valid) => {
        if (valid) {
          // console.log(valid, '下面执行真正的登录逻辑')
          //1.判断是否记住密码
          if (isKeepPwd) {
            //本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            //清除缓存
            // localCache.removeCahe('name')
            localCache.removeCahe('password')
          }

          //2.开始进行登录(异步请求)
          store.dispatch('loginModule/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped lang="less">
</style>
