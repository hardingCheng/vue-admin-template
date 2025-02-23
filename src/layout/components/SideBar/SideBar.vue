<template>
  <el-menu
    border-none
    class="sidebar-container-menu"
    :default-active="defaultActive"
    :background-color="varaibles.menuBg"
    :text-color="varaibles.menuText"
    :active-text-color="varaibles.menuActiveText"
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

// 获取当前路由实例
const route = useRoute()

// 从store中获取侧边栏状态
const { sidebar } = useAppStore()

// 计算当前激活的菜单项
const defaultActive = computed(() => {
  // .....
  return route.path
})
</script>

<style scoped></style>
