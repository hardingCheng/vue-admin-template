import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import UnoCSS from "unocss/vite"
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
  plugins: [vue(), UnoCSS()]
})
