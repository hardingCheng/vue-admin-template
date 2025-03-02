<!--
  主内容区域组件 (AppMain)
  
  功能描述：
  - 作为应用的主要内容显示区域，用于渲染当前路由匹配的组件
  - 实现页面缓存功能，避免重复创建组件实例
  - 提供页面切换动画，增强用户体验
  
  技术特点：
  1. 路由视图：使用 <router-view> 动态渲染当前路由对应的组件
  2. 组件缓存：通过 <keep-alive> 和 cachedViews 实现组件状态缓存
  3. 过渡动画：使用 <transition> 实现页面切换的平滑过渡效果
  4. 响应式设计：自适应顶部导航栏和标签栏的高度变化
  
  与其他组件的关系：
  - 位于布局结构的核心位置，显示在侧边栏和顶部导航栏之后
  - 与 TagsView 组件协同工作，实现页面缓存和快速切换
-->

<template>
  <!-- 主要内容区域容器 -->
  <div class="app-main">
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
