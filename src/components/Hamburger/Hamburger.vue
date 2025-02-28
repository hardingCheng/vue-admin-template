<!--
  Hamburger 组件
  
  作用：
  - 提供一个可点击的汉堡菜单图标，用于控制侧边栏的折叠/展开
  - 通常放置在页面顶部导航栏中作为侧边栏的开关控制器
  
  功能特色：
  1. 交互反馈：点击时触发折叠/展开事件
  2. 视觉反馈：根据当前折叠状态自动旋转图标
  3. 样式定制：使用 UnoCSS/Windi CSS 的 @apply 指令实现简洁的样式定义
  4. 过渡动画：图标旋转时有平滑的过渡效果
  5. 悬停效果：鼠标悬停时显示背景色变化，提升用户体验
-->
<template>
  <div class="hamburger-container">
    <svg-icon
      icon-name="ant-design:bars-outlined"
      custom-class="hamburger"
      :class="{ 'rotate-180': collapse }"
      @click="handleClick"
    ></svg-icon>
  </div>
</template>

<script lang="ts" setup>
// 定义组件属性：控制折叠状态
const { collapse } = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

// 定义事件发射器：用于触发折叠/展开事件
const emit = defineEmits<{ (e: "toggleCollapse"): void }>()

// 点击处理函数：触发折叠/展开事件
const handleClick = () => {
  emit("toggleCollapse")
}
</script>

<style scoped lang="scss">
.hamburger-container {
  @apply leading-[50px] float-left cursor-pointer px-10px hover:(bg-black/5); // 容器样式：行高、浮动、指针样式、内边距、悬停效果
}
.hamburger {
  @apply w-30px h-30px transition-transform duration-300; // 图标样式：尺寸、过渡动画
}
</style>
