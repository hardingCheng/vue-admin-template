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
