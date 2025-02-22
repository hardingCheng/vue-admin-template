// Hash 不可以做SEO
import { createRouter, createWebHistory } from "vue-router"
// 类型声明不会出现在编译后的JavaScript代码中，避免了无用的运行时代码残留
import type { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "dashboard"
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
