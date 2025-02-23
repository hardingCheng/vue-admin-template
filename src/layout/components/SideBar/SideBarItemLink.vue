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
