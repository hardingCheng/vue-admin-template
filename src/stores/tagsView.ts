import { defineStore } from "pinia"
import { ref } from "vue"
import type { RouteLocationNormalized } from "vue-router"

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export const useTagsView = defineStore("tagsView", () => {
  const visitedViews = ref<TagView[]>([])
  const cachedViews = ref<string[]>([])

  const addView = (view: TagView) => {
    addVisitedView(view)
    addCachedView(view)
  }

  const addVisitedView = (view: TagView) => {
    // 如果路由标记为不添加到标签视图，则跳过
    addCachedView(view)
    if (view.meta?.noTagsView) return

    if (visitedViews.value.some((v) => v.path === view.path)) {
      // 如果路径已存在，更新该标签的 query 参数
      for (let i = 0; i < visitedViews.value.length; i++) {
        console.warn("Duplicate path:", view.path)
        if (visitedViews.value[i].path === view.path) {
          // 保留原有标签的 title，但更新 query 和其他属性
          const updatedView = Object.assign({}, view, {
            title: visitedViews.value[i].title || view.meta?.title || "no-name",
            query: view.query
          })
          visitedViews.value.splice(i, 1, updatedView)
          break
        }
      }
      return
    }

    // 如果是新标签，添加到列表中，并保留 query 参数
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta?.title || "no-name",
        query: view.query
      })
    )
  }

  const addCachedView = (view: TagView) => {
    if (cachedViews.value.includes(view.name as string)) return
    // 当 noCache 为 true 时，添加到缓存列表
    if (view.meta?.noCache) {
      cachedViews.value.push(view.name as string)
    }
  }

  const deleteView = (view: TagView) => {
    return new Promise((resolve) => {
      deleteVisitedView(view)
      deleteCachedView(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  const deleteVisitedView = (view: TagView) => {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }

  const deleteCachedView = (view: TagView) => {
    const index = cachedViews.value.indexOf(view.name as string)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  const deleteOtherViews = (view: TagView) => {
    return new Promise((resolve) => {
      deleteOtherVisitedViews(view)
      deleteOtherCachedViews(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  const deleteOtherVisitedViews = (view: TagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }

  const deleteOtherCachedViews = (view: TagView) => {
    const index = cachedViews.value.indexOf(view.name as string)
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      cachedViews.value = []
    }
  }

  const deleteAllViews = () => {
    return new Promise((resolve) => {
      deleteAllVisitedViews()
      deleteAllCachedViews()
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  const deleteAllVisitedViews = () => {
    // 保留固定的标签
    visitedViews.value = visitedViews.value.filter((tag) => tag.meta?.affix)
  }

  const deleteAllCachedViews = () => {
    cachedViews.value = []
  }

  // 确保这两个方法被正确导出
  return {
    visitedViews,
    cachedViews,
    addView,
    addVisitedView,
    addCachedView,
    deleteView,
    deleteVisitedView,
    deleteCachedView,
    deleteOtherViews, // 确保这个方法被导出
    deleteAllViews // 确保这个方法被导出
  }
})
