<!--
  SettingDetail 组件
  
  功能描述：
  - 系统设置面板的详细内容组件
  - 提供主题颜色、布局元素显示等全局设置项
  - 通过 Pinia store 实现设置的状态管理和持久化
  
  主要设置项：
  1. 主题颜色：提供预设颜色选择和自定义颜色选择器
  2. Logo显示：控制侧边栏顶部Logo的显示/隐藏
  3. 标签栏显示：控制顶部标签导航栏的显示/隐藏
  
  使用方式：
  - 作为 Setting 组件的子组件，在抽屉面板中展示
  - 所有设置项变更会实时应用到整个应用
-->
<template>
  <div class="setting-container">
    <h3 class="setting-title">主题设置</h3>

    <div class="theme-color-container">
      <span class="theme-label">主题颜色</span>
      <div class="color-picker">
        <div
          v-for="(color, index) in themeColors"
          :key="index"
          class="color-item"
          :style="{ backgroundColor: color }"
          :class="{ active: currentColor === color }"
          @click="changeThemeColor(color)"
        >
          <svg-icon
            v-if="currentColor === color"
            icon-class="check"
            class="check-icon"
          />
        </div>

        <el-color-picker
          v-model="settingsStore.settings.themeColor"
          size="small"
          class="custom-color-picker"
          @change="changeThemeColor"
        />
      </div>
    </div>

    <!-- 添加Logo显示设置 -->
    <div class="setting-item">
      <span class="setting-label">显示Logo</span>
      <el-switch
        v-model="settingsStore.settings.showLogo"
        @change="toggleShowLogo"
      />
    </div>

    <!-- 添加 TagsView 显示设置 -->
    <div class="setting-item">
      <span class="setting-label">显示标签栏</span>
      <el-switch
        v-model="settingsStore.settings.showTagsView"
        @change="toggleShowTagsView"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings.ts"
import { computed } from "vue"

// 获取应用状态管理
const settingsStore = useSettingsStore()

// 预设的主题颜色选项
const themeColors = [
  "#409EFF", // 默认蓝色
  "#67C23A", // 绿色
  "#E6A23C", // 黄色
  "#F56C6C", // 红色
  "#909399", // 灰色
  "#8E44AD", // 紫色
  "#2E86C1", // 深蓝色
  "#16A085" // 青绿色
]

// 当前选中的主题色
const currentColor = computed(() => settingsStore.settings.themeColor)

// 切换主题色
const changeThemeColor = (color: string) => {
  settingsStore.setThemeColor("themeColor", color)
  // 更新CSS变量，应用到整个应用
}

// 切换Logo显示状态
const toggleShowLogo = (value: boolean) => {
  settingsStore.changeSettings({ key: "showLogo", value })
}

// 切换 TagsView 显示状态
const toggleShowTagsView = (value: boolean) => {
  settingsStore.changeSettings({ key: "showTagsView", value })
}
</script>
<style scoped lang="scss">
.setting-container {
  //padding: 16px;
  .setting-title {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }

  .theme-color-container {
    margin-bottom: 16px;

    .theme-label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      color: #606266;
    }

    .color-picker {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .color-item {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.1);
        }

        &.active {
          box-shadow:
            0 0 0 2px #fff,
            0 0 0 4px var(--el-color-primary);
        }

        i {
          color: white;
          font-size: 12px;
        }
      }

      .custom-color-picker {
        margin-left: 8px;
      }
    }
  }

  /* 添加设置项样式 */
  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .setting-label {
      font-size: 14px;
      color: #606266;
    }
  }
}
</style>
