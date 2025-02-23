// 导入全局变量定义
import globals from "globals"
import pluginJs from "@eslint/js" // 校验JS规范的
import tseslint from "typescript-eslint" // 推荐TS规范的
import pluginVue from "eslint-plugin-vue" // 推荐Vue规范的
// 导入 Prettier 推荐配置
import prettierRecommended from "eslint-plugin-prettier/recommended"

// 以下是三种导入 JSON 文件的方式
// 1. 使用 import 断言（需要较新的 Node.js 版本支持）
// import autoImport from "./.eslintrc-auto-import.json" with { type: "json" }

// 2. 使用 CommonJS 的 require（当前采用的方式）
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const autoImport = require("./.eslintrc-auto-import.json")

// 3. 使用 fs.readFile 读取（未使用）
/** @type {import('eslint').Linter.Config[]} */
export default [
  // 指定要检查的文件类型
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  // 配置全局变量，合并浏览器、Node.js 和自动导入的全局变量
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...autoImport.globals }
    }
  },
  // 使用 ESLint 推荐的 JS 规则
  pluginJs.configs.recommended,
  // 使用 TypeScript ESLint 推荐的规则
  ...tseslint.configs.recommended,
  // 使用 Vue ESLint 基础规则
  ...pluginVue.configs["flat/essential"],
  // Vue 文件特定配置
  {
    files: ["**/*.vue"],
    rules: {
      // 关闭组件名必须多个单词的规则
      "vue/multi-word-component-names": "off"
    },
    // 配置 Vue 文件的解析器为 TypeScript
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  // 使用 Prettier 推荐的格式化规则
  prettierRecommended
]