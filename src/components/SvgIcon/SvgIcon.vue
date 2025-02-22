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
import { isExternal } from "@/utils/validate"
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

const isExt = computed(() => isExternal(iconName))
// class="customClass + icon"
// 组合成的类名
const svgClass = computed(() => (customClass ? `icon ${customClass}` : "icon"))
// 通过mask 渲染svg 图标 兼容性不好，可以通过请求svg的方式来渲染
const styleExternalIcon = computed(() => ({
  mask: `url(${iconName}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${iconName}) no-repeat 50% 50%`,
  "mask-size": "cover"
}))
</script>
<!-- 在实现图标的时候 尽量采用svg，不要采用font图标 -->
