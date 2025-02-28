<!--
  SideBarItem 组件
  
  作用：
  - 负责递归渲染侧边栏菜单项，支持多级菜单结构
  - 根据路由配置自动生成菜单项和子菜单
  
  功能特色：
  1. 智能菜单渲染：根据子路由数量自动决定显示为普通菜单项还是子菜单
  2. 路由过滤：只显示非隐藏的路由项
  3. 支持外部链接：可以在菜单中添加指向外部网站的链接
  4. 图标支持：可以为每个菜单项配置图标
  5. 递归结构：通过自引用实现无限层级的菜单嵌套
  6. 路径解析：自动处理和拼接路由路径
  7. 配置灵活：支持通过meta属性控制菜单的显示行为（hidden, alwaysShow等）
-->

<template>
  <!-- 如果路由项不是隐藏的才显示 -->
  <template v-if="!item.meta?.hidden">
    <!-- 当子路由数量不超过1个且不强制显示子菜单时，显示为普通菜单项 -->
    <side-bar-item-link
      v-if="filteredChildren.length <= 1 && !item.meta?.alwaysShow"
      :to="resolvePath(singleChildRoute.path)"
    >
      <!-- Element Plus 菜单项组件 -->
      <el-menu-item :index="resolvePath(singleChildRoute.path)">
        <!-- 如果有图标则显示图标 -->
        <el-icon v-if="iconName">
          <svg-icon :icon-name="iconName" />
        </el-icon>
        <!-- 显示菜单标题 -->
        <template #title>{{ singleChildRoute.meta?.title }}</template>
      </el-menu-item>
    </side-bar-item-link>

    <!-- 当有多个子路由时，显示为子菜单 -->
    <el-sub-menu v-else :index="item.path">
      <!-- 子菜单标题部分 -->
      <template #title>
        <el-icon v-if="iconName"> <svg-icon :icon-name="iconName" /> </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <!-- 递归渲染子菜单项 -->
      <side-bar-item
        v-for="child of filteredChildren"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></side-bar-item>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
// 导入路由类型定义
import type { RouteRecordRaw } from "vue-router"
// 导入路径处理工具
import path from "path-browserify"
// 导入外部链接验证工具
import { isExternal } from "@/utils/validate.ts"
// 导入自定义链接组件
import SideBarItemLink from "@/layout/components/SideBar/SideBarItemLink.vue"

// 定义组件属性：接收路由项和基础路径
const { item, basePath } = defineProps<{
  item: RouteRecordRaw
  basePath: string
}>()

// 过滤出非隐藏的子路由
const filteredChildren = computed(
  () => item.children || [].filter((child) => !child.meta?.hidden)
)

// 计算要渲染的路由项：
// - 如果只有一个子路由，则使用该子路由
// - 否则使用当前路由项，但路径置空
const singleChildRoute = computed(() =>
  filteredChildren.value.length === 1
    ? filteredChildren.value[0]
    : {
        ...item,
        path: ""
      }
)

// 获取要显示的图标名称
const iconName = computed(() => singleChildRoute.value.meta?.icon)

// 解析完整的路由路径：
// - 如果是外部链接则直接返回
// - 否则拼接基础路径和子路径
const resolvePath = (childPath: string) => {
  if (isExternal(childPath)) {
    return childPath
  }
  return path.join(basePath, childPath)
}
</script>
