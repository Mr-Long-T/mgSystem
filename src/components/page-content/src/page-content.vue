<template>
  <div class="page-content">
    <lt-table :listData="dataList" v-bind="contentTableConfig">
      <!-- header中插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="mini">新建用户</el-button>
        <el-button icon="el-icon-refresh" size="mini"></el-button>
      </template>

      <!-- 列中插槽 -->
      <template #status="scope">
        <el-button plain size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button icon="el-icon-edit" size="mini" type="text">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="text">删除</el-button>
        </div>
      </template>
    </lt-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import LtTable from '@/base-ui/table'

export default defineComponent({
  components: {
    LtTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    // 提交到store子模块systemModule中调用getPageListAction方法发送网络请求
    store.dispatch('systemModule/getPageListAction', {
      // 查询路径（通过传进来的路径作为查询路径）
      pageName: props.pageName,
      // 查询参数
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    // const userList = computed(() => store.state.systemModule.userList)
    // const userCount = computed(() => store.state.system.userCount)
    const dataList = computed(() => store.getters[`systemModule/pageListData`](props.pageName))

    return {
      dataList
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
