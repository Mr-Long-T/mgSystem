<template>
  <div class="page-modal">
    <el-dialog title="新建用户" v-model="dialogVisible" width="30%" center destroy-on-close>
      <lt-form v-bind="modalConfig" v-model="formData"></lt-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleConfirmClick"> 确 定 </el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import LtForm from '@/base-ui/form'

export default defineComponent({
  components: {
    LtForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    // 监听点击编辑 拿到最新值
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑的确定按钮事件
        console.log('编辑用户')
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id
        })
      } else {
        // 新建的确定按钮事件
        console.log('新建用户')
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
