<template>
  <!-- 主要内容区域容器 -->
  <div class="app-main">
    <!-- 路由视图组件，使用具名插槽获取当前路由对应的组件 -->
    <router-view v-slot="{ Component }">
      <!-- 使用 transition 组件实现页面切换动画 -->
      <transition name="fade">
        <keep-alive>
          <component :is="Component" :key="$route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.app-main {
  @apply overflow-hidden pos-relative;
  min-height: calc(100vh - var(--tagsview-height) - var(--navbar-height));
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-500 pos-absolute;
}
.fade-enter-from {
  @apply opacity-0 translate-x-[50px];
}
.fade-leave-to {
  @apply opacity-0 translate-x-[-50px];
}
</style>
