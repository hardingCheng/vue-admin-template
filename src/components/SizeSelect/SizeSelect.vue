<!--
  SizeSelect 组件大小切换组件

  作用：
  - 提供界面元素大小的切换功能
  - 控制 Element Plus 组件的全局尺寸设置

  功能特色：
  1. 多尺寸选择：支持大(large)、默认(default)、小(small)三种尺寸
  2. 状态持久化：使用本地存储记住用户的尺寸偏好
  3. 全局生效：切换后即时应用到整个应用的 Element Plus 组件
  4. 下拉菜单交互：通过下拉菜单提供直观的选择界面
  5. 图标指示：使用图标直观展示当前选择的尺寸
-->

<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div class="size-select">
      <svg-icon icon-name="ant-design:column-height-outlined" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in sizeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="size === item.value"
        >
          <svg-icon :icon-name="item.icon" style="margin-right: 8px" />
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app.ts"
import type { Size } from "@/plugins/element.ts"
const { proxy } = getCurrentInstance()
// 获取应用状态管理
const appStore = useAppStore()

// 当前选择的尺寸
const size = ref<Size>(appStore.size || "default")

// 尺寸选项配置
const sizeOptions = [
  {
    label: "大型",
    value: "large",
    icon: "ant-design:column-height-outlined"
  },
  {
    label: "默认",
    value: "default",
    icon: "ant-design:column-width-outlined"
  },
  {
    label: "小型",
    value: "small",
    icon: "ant-design:small-dash-outlined"
  }
]

// 处理尺寸切换
const handleSetSize = (sizeVal: Size) => {
  if (size.value === sizeVal) return

  // 更新状态
  size.value = sizeVal

  // 更新应用状态
  appStore.setSize(sizeVal)

  // 显示成功消息
  proxy.$message({
    message: "设置尺寸成功",
    type: "success"
  })
}

// 组件挂载时初始化尺寸
onMounted(() => {
  if (appStore.size) {
    size.value = appStore.size
  }
})
</script>

<style scoped lang="scss">
.size-select {
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
