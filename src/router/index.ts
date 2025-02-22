// Hash 不可以做SEO
import { createRouter, createWebHistory } from "vue-router"
// 类型声明不会出现在编译后的JavaScript代码中，避免了无用的运行时代码残留
import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = []
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
