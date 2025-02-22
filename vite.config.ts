import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      // api
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false } // 给eslint生产的配置 只需要一次,
    }),
    Components({
      //  解析组件
      resolvers: [ElementPlusResolver()],
      // 所有的组件可以自动加载
      dirs: ["src/components", "src/layout/components"]
    }),
    ElementPlus({}) // 导入样式 不需要引入
  ]
})
