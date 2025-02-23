<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
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
  @apply bg-cyan overflow-hidden pos-relative;
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
