<!--
  App 根组件
  
  作用：
  - 应用的入口组件，包含整个应用的根结构
  - 通过 el-config-provider 提供全局配置给所有 Element Plus 组件
  
  功能特色：
  1. 全局配置：为 Element Plus 组件提供统一的尺寸和层级设置
  2. 响应式设计：组件尺寸会根据用户的偏好设置自动调整
  3. 路由视图：包含 router-view 以展示当前路由对应的组件
-->

<template>
  <!-- Element Plus 全局配置提供者 -->
  <el-config-provider :size="size">
    <!-- 路由视图容器，根据当前路由显示对应组件 -->
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useAppStore } from "@/stores/app"

// 获取应用状态管理
const appStore = useAppStore()

// 计算属性：获取当前组件尺寸设置
const size = computed(() => appStore.size)
</script>

<style scoped></style>
