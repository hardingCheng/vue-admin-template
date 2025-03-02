<!--
  侧边栏 Logo 组件
  
  功能描述：
  - 显示系统 Logo 和标题
  - 支持侧边栏折叠状态的响应式显示
  - 点击 Logo 可导航至首页
  
  属性：
  - collapse: Boolean - 控制侧边栏是否处于折叠状态
    - true: 仅显示 Logo 图标，居中显示
    - false: 显示 Logo 图标和系统标题
  
  样式特点：
  - 自适应侧边栏宽度变化
  - 折叠时平滑过渡动画
-->
<template>
  <div class="sidebar-logon-container" :class="{ collapse }">
    <router-link to="/">
      <img :src="logo" alt="" />
    </router-link>
    <h1 v-if="!collapse">Vue admin</h1>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/vue.png"

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped lang="scss">
.sidebar-logon-container {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px;
  overflow: hidden;
  transition: width 0.3s;

  img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  h1 {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
  }

  &.collapse {
    justify-content: center;

    img {
      margin-right: 0;
    }
  }
}
</style>
