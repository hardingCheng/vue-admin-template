<template>
  <!-- 主要内容区域容器 -->
  <div class="app-main">
    <div class="debug-info">缓存的视图: {{ cachedViews }}</div>
    <!-- 路由视图组件，使用具名插槽获取当前路由对应的组件 -->
    <router-view v-slot="{ Component }">
      <!-- 使用 transition 组件实现页面切换动画 -->
      <transition name="fade">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { useTagsView } from "@/stores/tagsView"
import { computed, onMounted, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
// 不要直接解构 store，而是保持对整个 store 的引用
const tagsViewStore = useTagsView()

// 使用计算属性来保持响应性
const cachedViews = computed(() => tagsViewStore.cachedViews)

// 调试信息
onMounted(() => {
  console.log("当前路由:", route.name)
  console.log("缓存视图列表:", cachedViews.value)
})

// 监听缓存变化
watch(
  cachedViews,
  (newVal) => {
    console.log("缓存视图更新:", newVal)
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.app-main {
  @apply overflow-hidden pos-relative;
  min-height: calc(100vh - var(--tagsview-height) - var(--navbar-height));
}

.debug-info {
  position: fixed;
  top: 100px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  z-index: 9999;
  font-size: 12px;
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
