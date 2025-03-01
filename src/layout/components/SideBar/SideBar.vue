<!--
  SideBar 组件

  作用：
  - 系统侧边栏的主容器组件
  - 负责渲染整个侧边导航菜单结构

  功能特色：
  1. 基于 Element Plus 的菜单组件实现
  2. 动态路由渲染：根据路由配置自动生成菜单结构
  3. 主题定制：使用 SCSS 变量控制菜单颜色和样式
  4. 折叠状态管理：通过应用状态管理控制菜单的展开/折叠
  5. 自动高亮：根据当前路由路径自动高亮对应的菜单项
  6. 递归菜单：通过 SideBarItem 组件实现多级菜单的递归渲染
-->
<template>
  <side-logo v-if="showLogo" :collapse="sidebar.opened"></side-logo>
  <el-menu
    border-none
    class="sidebar-container-menu"
    :default-active="defaultActive"
    :background-color="varaibles.menuBg"
    :text-color="varaibles.menuText"
    :active-text-color="themeColor"
    :collapse="sidebar.opened"
  >
    <!--    :base-path="route.path"  父路径传递-->
    <side-bar-item
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>

  <!-- :collapse="true" -->
</template>

<script lang="ts" setup>
// 导入应用状态管理store
import { useAppStore } from "@/stores/app"
// 导入样式变量
import varaibles from "@/style/variables.module.scss"
// 导入路由配置
import { routes } from "@/router"
import { useSettingsStore } from "@/stores/settings.ts"
import SideLogo from "@/layout/components/SideBar/SideLogo.vue"

// 获取当前路由实例
const route = useRoute()

// 从store中获取侧边栏状态
const { sidebar } = useAppStore()

// 计算当前激活的菜单项
const defaultActive = computed(() => {
  // .....
  return route.path
})
const settingsStore = useSettingsStore()
const themeColor = computed(() => settingsStore.settings.themeColor)
const showLogo = computed(() => settingsStore.settings.showLogo)
</script>

<style scoped></style>
