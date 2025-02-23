// 从 vite 中导入 defineConfig 函数，用于配置 Vite
import { defineConfig } from "vite"
// 导入 Vue 插件，用于支持 Vue 单文件组件
import vue from "@vitejs/plugin-vue"
// 导入 Node.js 的 path 模块，用于处理文件路径
import path from "path"
// 导入 UnoCSS 插件，用于原子化 CSS
import UnoCSS from "unocss/vite"
// 导入自动导入插件，用于自动导入 API
import AutoImport from "unplugin-auto-import/vite"
// 导入组件自动注册插件
import Components from "unplugin-vue-components/vite"
// 导入 Element Plus 组件解析器
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// 导入 Element Plus 样式自动导入插件
import ElementPlus from "unplugin-element-plus/vite"

// Vite 配置
export default defineConfig({
  resolve: {
    // 配置路径别名
    alias: [
      {
        find: "@", // 将 @ 符号
        replacement: path.resolve(__dirname, "src") // 解析为项目 src 目录的绝对路径
      }
    ]
  },
  plugins: [
    vue(), // 启用 Vue 插件
    UnoCSS(), // 启用 UnoCSS 插件
    AutoImport({
      // 自动导入 Vue、Vue Router 和 Pinia 相关 API
      imports: ["vue", "vue-router", "pinia"],
      // 自动导入 Element Plus 组件
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false } // 是否生成 ESLint 配置文件
    }),
    Components({
      // 配置组件解析器，用于自动导入 Element Plus 组件
      resolvers: [ElementPlusResolver()],
      // 指定自动导入组件的目录
      dirs: ["src/components", "src/layout/components"]
    }),
    ElementPlus({}) // 启用 Element Plus 插件，自动导入样式
  ]
})
