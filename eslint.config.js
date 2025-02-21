import globals from "globals"
import pluginJs from "@eslint/js" // 校验JS规范的
import tseslint from "typescript-eslint" // 推荐TS规范的
import pluginVue from "eslint-plugin-vue" // 推荐Vue规范的
import prettierRecommended from "eslint-plugin-prettier/recommended"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  prettierRecommended
]
