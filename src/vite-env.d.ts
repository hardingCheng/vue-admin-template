/**
 * TypeScript 声明文件
 *
 * 功能描述：
 * - 为项目中使用的第三方模块提供类型声明
 * - 包含 Vite 客户端类型引用
 * - 声明 css-color-function 模块的类型定义
 *
 * 主要内容：
 * 1. Vite 客户端类型引用：提供 import.meta.env 等 Vite 特有 API 的类型支持
 * 2. css-color-function 模块声明：为颜色处理函数提供类型支持
 */
/// <reference types="vite/client" />

declare module "css-color-function" {
  export function convert(color: string): string
}
