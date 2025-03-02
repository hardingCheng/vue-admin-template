<!--
  顶部导航栏组件 (Navbar)
  
  功能描述：
  - 作为应用的顶部导航区域，提供全局操作入口
  - 包含侧边栏折叠控制、面包屑导航和右侧功能区
  
  组件构成：
  1. 汉堡包按钮：控制侧边栏的展开/收起状态
  2. 面包屑导航：显示当前页面在系统中的层级位置
  3. 右侧功能区：
     - 全屏切换按钮
     - 尺寸选择器
     - 用户头像及下拉菜单
     - 系统设置入口
  
  交互特点：
  - 与侧边栏组件联动，控制其展开/收起状态
  - 提供快捷操作入口，增强用户体验
-->

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
      <setting></setting>
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
