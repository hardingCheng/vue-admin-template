<!--
 * @description: 系统设置组件
 * @features: 
 *   1. 点击设置图标打开抽屉式设置面板
 *   2. 包含主题设置、布局配置等全局设置项
 *   3. 设置项通过 SettingDetail 子组件进行具体实现
 * @usage: 通常放置在导航栏右侧，用于全局配置的快速访问
-->
<template>
  <div class="setting-icon" @click="openDrawer">
    <svg-icon icon-name="ant-design:setting-outlined" class="setting-svg" />
  </div>

  <el-drawer
    v-model="drawerVisible"
    title="系统设置"
    direction="rtl"
    size="300px"
  >
    <SettingDetail />
  </el-drawer>
</template>

<script setup lang="ts">
import SettingDetail from "./SettingDetail.vue"

const drawerVisible = ref(false)

const openDrawer = () => {
  drawerVisible.value = true
}
</script>

<style scoped lang="scss">
.setting-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .setting-svg {
    font-size: 18px;
    color: #5a5e66;
  }
}
</style>
