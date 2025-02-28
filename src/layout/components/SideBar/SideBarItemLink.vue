<!--
  SideBarItemLink 组件
  
  作用：
  - 智能链接组件，用于侧边栏菜单项的链接处理
  - 自动区分内部路由和外部链接，并使用适当的组件进行渲染
  
  功能特色：
  1. 动态组件渲染：根据链接类型自动选择渲染为 <router-link> 或 <a> 标签
  2. 外部链接支持：自动识别外部链接并在新标签页中打开
  3. 内部路由导航：使用 vue-router 的 router-link 实现无刷新导航
  4. 灵活的内容插槽：允许传入任意内容作为链接的子元素
-->
<template>
  <!-- 动态组件：根据链接类型渲染为 <a> 标签或 <router-link> 组件 -->
  <component :is="componentType" v-bind="componentProps">
    <!-- 插槽：用于传入链接内容 -->
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
// 导入外部链接验证工具函数
import { isExternal } from "@/utils/validate.ts"

// 定义组件属性：接收 to 参数作为链接地址
const { to } = defineProps<{
  to: string
}>()

// 计算属性：判断是否为外部链接
const isExt = computed(() => isExternal(to))

// 计算属性：根据链接类型决定渲染的组件类型
const componentType = computed(() => {
  return isExt.value ? "a" : "router-link"
})

// 计算属性：根据链接类型设置组件的属性
const componentProps = computed(() => {
  if (isExt.value) {
    // 外部链接：使用 href 和 target 属性
    return {
      href: to,
      target: "_blank"
    }
  } else {
    // 内部链接：使用 vue-router 的 to 属性
    return {
      to
    }
  }
})
</script>

<style scoped></style>
