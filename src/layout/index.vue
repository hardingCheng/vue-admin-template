<template>
  <!-- 整体布局容器：包含侧边栏和主内容区 -->
  <div class="app-wrapper">
    <!-- 左侧边栏：包含导航菜单 -->
    <div class="sidebar-container">
      <side-bar></side-bar>
    </div>
    <!-- 右侧主要内容区域 -->
    <div class="main-container">
      <!-- 顶部区域：包含导航栏和标签栏 -->
      <div class="header">
        <!--  上边包含收缩的导航条 -->
        <navbar></navbar>
        <!-- 标签导航栏：用于显示页面导航标签 -->
        <!--        <tags-view />-->
      </div>
      <!-- 主要内容区域：用于显示路由页面内容 -->
      <app-main></app-main>/
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入主内容区域组件，用于显示路由匹配的组件内容
import AppMain from "@/layout/components/AppMain.vue"
</script>

<style scoped lang="scss">
.app-wrapper {
  @apply flex w-full h-full;
  .sidebar-container {
    // 跨组件设置样式
    @apply bg-[var(--menu-bg)];
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }
  .main-container {
    @apply flex flex-col flex-1;
  }
  .header {
    @apply h-84px;
    .navbar {
      @apply h-50px;
    }
    .tags-view {
      @apply h-[var(--tagsview-height)]  bg-blue;
    }
  }
}
</style>
