import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"
export const constantRoutes: RouteRecordRaw[] = [
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
          icon: "ant-design:bank-outlined",
          title: "dashboard"
        }
      }
    ]
  }
]
const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        name: "documentation",
        component: () => import("@/views/documentation/index.vue"),
        meta: {
          icon: "ant-design:database-filled",
          title: "documentation"
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "guide",
        component: () => import("@/views/guide/index.vue"),
        meta: {
          icon: "ant-design:car-twotone",
          title: "guide"
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/menu",
    meta: {
      icon: "ant-design:unlock-filled",
      title: "system",
      alwaysShow: true
    },
    children: [
      {
        path: "menu",
        name: "menu",
        component: () => import("@/views/system/menu.vue"),
        meta: {
          icon: "ant-design:unlock-filled",
          title: "menu"
        }
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/system/role.vue"),
        meta: {
          icon: "ant-design:unlock-filled",
          title: "menu"
        }
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/system/user.vue"),
        meta: {
          icon: "ant-design:unlock-filled",
          title: "user"
        }
      }
    ]
  }
]

export const routes = [...constantRoutes, ...asyncRoutes]

export default createRouter({
  routes, // 路由表
  history: createWebHistory() //  路由模式
})
