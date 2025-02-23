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
import { useAppStore } from "@/stores/app"
import varaibles from "@/style/variables.module.scss"
import { routes } from "@/router"

const route = useRoute()

const { sidebar } = useAppStore()

const defaultActive = computed(() => {
  // .....
  return route.path
})
</script>

<style scoped></style>
