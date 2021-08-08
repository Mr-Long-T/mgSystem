<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//defineComponent => 可以帮助做类型推导
export default defineComponent({
  name: 'App',
  components: {}
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
