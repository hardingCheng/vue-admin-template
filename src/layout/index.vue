<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <side-bar></side-bar>
    </div>
    <div class="main-container">
      <div class="header">
        <!--  上边包含收缩的导航条 -->
        <navbar></navbar>
        <div class="tags-view">导航条-2</div>
      </div>
      <app-main></app-main>/
    </div>
  </div>
</template>
<script setup lang="ts">
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
      @apply h-50px bg-yellow;
    }
    .tags-view {
      @apply h-[var(--tagsview-height)]  bg-blue;
    }
  }
}
</style>
