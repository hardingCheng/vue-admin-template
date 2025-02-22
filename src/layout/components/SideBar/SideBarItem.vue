<template>
  <el-menu-item v-if="filteredChildren.length <= 1">
    <el-icon v-if="iconName">
      <svg-icon :icon-name="iconName" />
    </el-icon>
    <template #title>{{ singleChildRoute.meta?.title }}</template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon v-if="iconName"> <svg-icon :icon-name="iconName" /> </el-icon>
      <span>{{ singleChildRoute.meta?.title }}</span>
    </template>
    <side-bar-item
      v-for="child of filteredChildren"
      :key="child.path"
      :item="child"
    ></side-bar-item>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router"

const { item } = defineProps<{ item: RouteRecordRaw }>()

// 如果只有一个儿子，说明我们直接渲染这里的一个儿子即可

// 如果菜单对应的children有多个 ，使用el-submenu去渲染

const filteredChildren = computed(() => item.children || [])

// 要渲染的路由
const singleChildRoute = computed(() =>
  filteredChildren.value.length === 1 ? filteredChildren.value[0] : item
)
// 要渲染的图标
const iconName = computed(() => singleChildRoute.value.meta?.icon)
</script>
