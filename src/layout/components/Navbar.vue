<template>
  <!-- 顶部导航栏容器 -->
  <div class="navbar" flex>
    <!-- 汉堡包按钮组件：控制侧边栏的展开/收起 -->
    <hamburger
      @toggleCollapse="toggleSidebar"
      :collapse="sidebar.opened"
    ></hamburger>
    <breadcrumb></breadcrumb>
    <div flex flex-1 justify-end>
      <screenfull></screenfull>
      <size-select></size-select>
      <avatar></avatar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  @apply h-[var(--navbar-height)];
}
</style>

<script lang="ts" setup>
// 导入应用状态管理store
import { useAppStore } from "@/stores/app"
// 在解构的时候要考虑值是不是对象，如果非对象解构出来就 丧失响应式了
// 从store中解构出切换侧边栏方法和侧边栏状态
const { toggleSidebar, sidebar } = useAppStore()
</script>
