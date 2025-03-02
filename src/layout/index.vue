<!--
  主布局组件 (Layout)
  
  功能描述：
  - 定义整个应用的基础布局结构
  - 组织侧边栏、顶部导航栏、标签栏和主内容区
  - 响应用户设置，动态调整布局元素的显示状态
  
  布局结构：
  1. 侧边栏 (SideBar)：左侧导航菜单，可折叠
  2. 主内容区 (MainContainer)：
     - 顶部区域 (Header)：包含导航栏和可选的标签栏
     - 应用主体 (AppMain)：显示路由匹配的页面内容
  
  响应式特性：
  - 支持侧边栏折叠/展开
  - 支持标签栏显示/隐藏
  - 自动调整各区域尺寸和布局
-->
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
      <div
        class="header"
        :class="{ 'no-tags-view': !settingsStore.settings.showTagsView }"
      >
        <!--  上边包含收缩的导航条 -->
        <navbar></navbar>
        <!-- 标签导航栏：用于显示页面导航标签 -->
        <tags-view v-if="settingsStore.settings.showTagsView" />
      </div>
      <!-- 主要内容区域：用于显示路由页面内容 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入主内容区域组件，用于显示路由匹配的组件内容
import AppMain from "@/layout/components/AppMain.vue"
import { useSettingsStore } from "@/stores/settings"

const settingsStore = useSettingsStore()
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
    @apply flex flex-col flex-1 overflow-hidden;
  }
  .header {
    @apply h-84px;
    transition: height 0.3s;

    &.no-tags-view {
      @apply h-50px;
    }

    .navbar {
      @apply h-50px;
    }
    .tags-view {
      @apply h-[var(--tagsview-height)];
    }
  }
}
</style>
