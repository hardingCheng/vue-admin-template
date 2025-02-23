<template>
  <component :is="componentType" v-bind="componentProps">
    <slot />
  </component>
</template>
<script setup lang="ts">
import { isExternal } from "@/utils/validate.ts"
const { to } = defineProps<{
  to: string
}>()
const isExt = computed(() => isExternal(to))
const componentType = computed(() => {
  return isExt.value ? "a" : "router-link"
})
const componentProps = computed(() => {
  if (isExt.value) {
    return {
      href: to,
      target: "_blank"
    }
  } else {
    return {
      to
    }
  }
})
</script>
<style scoped></style>
