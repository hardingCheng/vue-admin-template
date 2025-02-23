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
