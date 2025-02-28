<!--
  Breadcrumb 面包屑导航组件
  
  作用：
  - 显示用户在应用中的当前位置和导航路径
  - 提供快速返回上级页面的导航链接
  - 增强用户体验，减少用户迷失感
  
  功能特色：
  1. 动态生成：根据当前路由自动生成完整的导航路径
  2. 智能过滤：可通过路由 meta.breadcrumb 属性控制是否在面包屑中显示
  3. 动态参数支持：处理包含动态参数的路由路径（如 /user/:id）
  4. 重定向处理：支持路由重定向配置
  5. 默认首页：自动添加 Dashboard 作为导航起点
  6. 自定义样式：提供简洁美观的面包屑样式
  7. 响应式更新：监听路由变化自动更新面包屑内容
-->

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!--    a.path 可能是一个路由动态参数导航 /test/index:id-->
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="levelList.length - 1 === index">{{
        item.meta?.title || "未命名"
      }}</span>
      <a v-else @click="handleLink(item)">
        {{ item.meta?.title || "未命名" }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute, RouteLocationMatched } from "vue-router"
import { compile } from "path-to-regexp"
import router from "@/router"
// 获取当前路由实例
const route = useRoute()

// 存储面包屑层级列表
const levelList = ref<RouteLocationMatched[]>([])

// 生成面包屑数据
const getBreadcrumb = () => {
  // 过滤掉没有 meta.title 的路由项
  const matched = route.matched.filter((item) => item.meta && item.meta.title)

  // 如果第一个不是首页，则不处理
  // 注意：如果您的首页路径不是 '/dashboard'，请修改此处判断逻辑
  if (matched[0]?.path !== "/dashboard") {
    matched.unshift({
      path: "/dashboard",
      meta: { title: "dashboard" }
    } as unknown as RouteLocationMatched)
  }

  levelList.value = matched.filter((item) => item.meta?.breadcrumb !== false)
}

// 初始化面包屑
getBreadcrumb()

// 监听路由变化，更新面包屑
watch(
  () => route.path,
  () => getBreadcrumb(),
  { immediate: true }
)

const compilePath = (path: string) => {
  const params = route.params
  return compile(path)(params)
}
const handleLink = (item: RouteLocationMatched) => {
  const { path, redirect } = item
  if (redirect) {
    return router.push(redirect)
  }
  const link = compilePath(path)
  router.push(link)
}
</script>

<style scoped lang="scss">
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .el-breadcrumb__inner,
  .el-breadcrumb__inner a {
    font-weight: normal;
  }

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
