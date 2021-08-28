<template>
  <div class="page-content">
    <!-- 给page双向绑定的，page update：modelValue 不取名：属性modelValue 事件update:modelValue -->
    <lt-table
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- header中插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="mini">新建用户</el-button>
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
          <el-button v-if="isUpdate" icon="el-icon-edit" size="mini" type="text">编辑</el-button>
          <el-button v-if="isDelete" icon="el-icon-delete" size="mini" type="text">删除</el-button>
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 由传入的config决定-->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <!-- slotName有值的时候设置 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </lt-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

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

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo (分页逻辑)
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    // 监听pageInfo值改变，根据最新数据重新发送请求
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求：提交到store子模块systemModule中调用getPageListAction方法
    const getPageData = (queryInfo: any = {}) => {
      // 查询权限 有-->发送网络请求
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        // 查询路径（通过传进来的路径作为查询路径）
        pageName: props.pageName,
        // 查询参数
        queryInfo: {
          // offset 偏移量(请求第几页)
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    // 3.从vuex中获取数据
    // const userList = computed(() => store.state.systemModule.userList)
    const dataList = computed(() => store.getters[`systemModule/pageListData`](props.pageName))
    // 拿到数据的数量
    // const dataCount = computed(() => store.state.systemModule.userCount)
    const dataCount = computed(() => store.getters[`systemModule/pageListCount`](props.pageName))

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      // 过滤掉公共 slotName
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
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
