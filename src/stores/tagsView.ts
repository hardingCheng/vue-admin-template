import { defineStore } from "pinia"
import { ref } from "vue"

export const useTagsViewStore = defineStore("tagsView", () => {
  const visitedViews = ref([])
  const cachedViews = ref([])
  const fixedTags = ref([])

  function addView(view) {
    addVisitedView(view)
    addCachedView(view)
  }

  function addVisitedView(view) {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    )
  }

  function addCachedView(view) {
    if (cachedViews.value.includes(view.name)) return
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name)
    }
  }

  function addFixedTag(view) {
    if (fixedTags.value.some((v) => v.path === view.path)) return
    fixedTags.value.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    )
  }

  function removeFixedTag(view) {
    const index = fixedTags.value.findIndex((v) => v.path === view.path)
    if (index > -1) {
      fixedTags.value.splice(index, 1)
    }
  }

  function delView(view) {
    return new Promise((resolve) => {
      delVisitedView(view)
      delCachedView(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delVisitedView(view) {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }

  function delCachedView(view) {
    const index = cachedViews.value.indexOf(view.name)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  function delOthersViews(view) {
    return new Promise((resolve) => {
      delOthersVisitedViews(view)
      delOthersCachedViews(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delOthersVisitedViews(view) {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta.affix || v.path === view.path || isTagFixed(v)
    })
  }

  function isTagFixed(view) {
    return fixedTags.value.some((v) => v.path === view.path)
  }

  function delOthersCachedViews(view) {
    const index = cachedViews.value.indexOf(view.name)
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // 如果没有找到当前视图，则清空所有缓存视图
      cachedViews.value = []
    }
  }

  function delAllViews() {
    return new Promise((resolve) => {
      delAllVisitedViews()
      delAllCachedViews()
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delAllVisitedViews() {
    // 保留固定的标签
    visitedViews.value = visitedViews.value.filter(
      (tag) => tag.meta.affix || isTagFixed(tag)
    )
  }

  function delAllCachedViews() {
    cachedViews.value = []
  }

  function updateVisitedView(view) {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  return {
    visitedViews,
    cachedViews,
    fixedTags,
    addView,
    addVisitedView,
    addCachedView,
    addFixedTag,
    removeFixedTag,
    delView,
    delVisitedView,
    delCachedView,
    delOthersViews,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllViews,
    delAllVisitedViews,
    delAllCachedViews,
    updateVisitedView
  }
})
