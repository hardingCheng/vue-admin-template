import globals from "globals"
import pluginJs from "@eslint/js" // 校验JS规范的
import tseslint from "typescript-eslint" // 推荐TS规范的
import pluginVue from "eslint-plugin-vue" // 推荐Vue规范的
import prettierRecommended from "eslint-plugin-prettier/recommended"

// esModule  commonjs
// 1.
// import autoImport from "./.eslintrc-auto-import.json" with { type: "json" }

// 2.
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const autoImport = require("./.eslintrc-auto-import.json")

// 3.fs.readFile
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...autoImport.globals }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off"
    },
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  prettierRecommended
]
