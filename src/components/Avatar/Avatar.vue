<!--
  Avatar 组件

  作用：
  - 显示用户头像并提供用户相关操作的下拉菜单
  - 包含导航到首页、个人设置页面和退出登录功能

  功能特色：
  1. 头像显示：展示用户头像图片
  2. 下拉菜单：点击头像显示操作菜单
  3. 页面导航：提供首页和个人设置页面的快捷链接
  4. 退出功能：支持用户退出登录
-->

<template>
  <el-dropdown>
    <div class="avatar">
      <img :src="avatar" size-20px rounded-sm cursor-pointer outline-none />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个人设置</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">
          <span block>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import avatar from "@/assets/vue.png"
const logout = () => {}
</script>

<style scoped lang="scss">
.avatar {
  padding: 0 10px;
  font-size: 18px;
  color: #5a5e66;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}
</style>
