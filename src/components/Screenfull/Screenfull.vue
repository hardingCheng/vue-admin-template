<!--
  Screenfull 全屏切换组件

  作用：
  - 提供一个按钮，允许用户切换页面的全屏显示状态
  - 显示当前全屏状态的视觉反馈

  功能特色：
  1. 全屏切换：支持进入和退出全屏模式
  2. 状态指示：通过图标变化指示当前是否处于全屏状态
  3. 键盘支持：监听 ESC 键退出全屏时自动更新状态
  4. 浏览器兼容：处理不同浏览器的全屏 API 差异
  5. 优雅降级：在不支持全屏 API 的环境中优雅处理
-->

<template>
  <div class="screenfull-container" @click="toggle">
    <svg-icon
      :icon-name="
        isFullscreen
          ? 'ant-design:fullscreen-exit-outlined'
          : 'ant-design:fullscreen-outlined'
      "
      class="screenfull-icon"
    />
  </div>
</template>

<script setup lang="ts">
import screenfull from "screenfull"
const { proxy } = getCurrentInstance()
// 全屏状态
const isFullscreen = ref(false)

// 切换全屏状态
const toggle = () => {
  if (!screenfull.isEnabled) {
    proxy.$message({
      message: "您的浏览器不支持全屏功能",
      type: "warning"
    })
    return
  }

  screenfull.toggle()
}

// 更新全屏状态
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 组件挂载时添加事件监听
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on("change", change)
  }
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change)
  }
})
</script>

<style scoped lang="scss">
.screenfull-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}

.screenfull-icon {
  font-size: 20px;
  color: #5a5e66;
}
</style>
