import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path";

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
  plugins: [vue()]
})
