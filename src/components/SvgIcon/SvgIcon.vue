<!--
  SvgIcon 组件
  
  作用：
  - 通用图标组件，支持显示 Iconify 图标库中的图标和外部 SVG 图标
  - 为整个应用提供统一的图标渲染解决方案
  
  功能特色：
  1. 双模式支持：可以渲染 Iconify 图标库中的图标或外部 SVG 图标
  2. 自动识别：根据图标名称自动判断使用哪种渲染模式
  3. 样式定制：支持通过 customClass 属性添加自定义样式
  4. 属性透传：通过 v-bind="$attrs" 支持将任意属性传递给底层元素
  5. 外部 SVG 支持：使用 CSS mask 技术渲染外部 SVG 图标
  6. 兼容性处理：为 mask 属性添加 webkit 前缀以提高兼容性
-->
<template>
  <IconifyIcon
    :class="svgClass"
    :icon="iconName"
    v-if="!isExt"
    v-bind="$attrs"
  ></IconifyIcon>
  <div
    v-else
    :style="styleExternalIcon"
    :class="svgClass"
    bg-current
    v-bind="$attrs"
  ></div>
</template>
<script setup lang="ts">
// 导入外部链接验证工具
import { isExternal } from "@/utils/validate"
// 导入 Iconify 图标组件
import { Icon as IconifyIcon } from "@iconify/vue"

// import { PropType } from "vue"
// Vue3.5 withDefaults 解构属性不支持
// withDefaults 是 Vue3 中与 defineProps 配套使用的工具函数，主要用于为组件的 props 设置类型化默认值，尤其在 TypeScript 项目中提供类型安全保障。
// const props = withDefaults(
//   defineProps<{
//     iconName: string
//     customClass?: string
//   }>(),
//   {
//     customClass: ""
//   }
// )
// const { iconName, customClass } = defineProps<{
//   iconName: string
//   customClass?: string
// }>()

// const { customClass } = defineProps({
//   customClass: Object as PropType<{ a: 1; b: 2 }>
// })

// 在 Vue3.5之后，原生支持 props 解构 + 默认值设置，使得代码更简洁：
// 定义组件属性：图标名称和自定义类名
const { iconName, customClass } = defineProps({
  iconName: {
    type: String,
    default: ""
  },
  customClass: {
    type: String,
    default: ""
  }
})

// 判断是否为外部图标
const isExt = computed(() => isExternal(iconName))

// class="customClass + icon"
// 组合成的类名
const svgClass = computed(() => (customClass ? `icon ${customClass}` : "icon"))

// 通过mask 渲染svg 图标 兼容性不好，可以通过请求svg的方式来渲染
// 外部图标的样式配置：使用 CSS mask 属性渲染 SVG
const styleExternalIcon = computed(() => ({
  mask: `url(${iconName}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${iconName}) no-repeat 50% 50%`,
  "mask-size": "cover"
}))
</script>
