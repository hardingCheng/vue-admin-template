/**
 * Element Plus 插件配置
 *
 * 功能描述：
 * - 将 Element Plus 的常用组件和服务注册为全局属性
 * - 使这些组件可以在任何组件中通过 this.$xxx 的方式访问
 *
 * 注册的全局服务：
 * - $message: 消息提示服务
 * - $notify: 通知提示服务
 * - $confirm: 确认框服务
 * - $alert: 警告框服务
 * - $prompt: 输入框服务
 *
 * 使用方式：
 * - 在 main.ts 中通过 app.use() 注册此插件
 */
import type { App } from "vue"

import { ElMessage, ElNotification, ElMessageBox } from "element-plus"

export default (app: App) => {
  // 都放到组件的实例上了
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}

export type Size = "default" | "large" | "small"
