<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"
import { onBeforeMount } from "vue"

const route = useRoute()
const router = useRouter()

// 仅是为了实现重定向功能
onBeforeMount(() => {
  // 添加一个小延迟，确保路由完全准备好
  setTimeout(() => {
    router.replace({
      path: "/" + route.params.path,
      query: route.query
    })
  }, 10)
})
</script>

<template>
  <div></div>
</template>
