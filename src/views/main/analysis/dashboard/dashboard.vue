<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <lt-card title="商品分类数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </lt-card>
      </el-col>
      <el-col :span="10">
        <lt-card title="各城市销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </lt-card>
      </el-col>
      <el-col :span="7">
        <lt-card title="商品分类数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </lt-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <lt-card title="商品分类销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </lt-card>
      </el-col>
      <el-col :span="12">
        <lt-card title="商品分类销量">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </lt-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import LtCard from '@/base-ui/card'
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    LtCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboardModule/getDashboardDataAction')

    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboardModule.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return { categoryGoodsCount, categoryGoodsSale, categoryGoodsFavor, addressGoodsSale }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
