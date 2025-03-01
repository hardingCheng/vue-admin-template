<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle="!isAffix(tag) && closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <svg-icon icon-name="ant-design:close-outlined" />
        </span>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
      <li v-if="!isAffix(selectedTag)" @click="toggleFixedTag(selectedTag)">
        {{ isTagFixed(selectedTag) ? "取消固定" : "固定标签" }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import ScrollPane from "./ScrollPane.vue"
import { useTagsViewStore } from "@/stores/tagsView"
import path from "path-browserify"

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref({})
const affixTags = ref([])
const scrollPaneRef = ref(null)

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()

const visitedViews = computed(() => tagsViewStore.visitedViews)
const routes = computed(() => router.options.routes)
const fixedTags = computed(() => tagsViewStore.fixedTags)

watch(
  () => route.path,
  () => {
    addTags()
    moveToCurrentTag()
  }
)

watch(
  () => route.fullPath,
  () => {
    addTags()
    moveToCurrentTag()
  }
)

watch(
  () => visible.value,
  (value) => {
    if (value) {
      document.body.addEventListener("click", closeMenu)
    } else {
      document.body.removeEventListener("click", closeMenu)
    }
  }
)

function isActive(tag) {
  return tag.path === route.path
}

function activeStyle(tag) {
  if (isActive(tag)) {
    return {
      "background-color": "#42b983",
      "border-color": "#42b983"
    }
  }
  return {}
}

function isAffix(tag) {
  return tag.meta && tag.meta.affix
}

function isTagFixed(tag) {
  return fixedTags.value.some((t) => t.path === tag.path)
}

function filterAffixTags(routes, basePath = "/") {
  let tags = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(
        route.children,
        path.resolve(basePath, route.path)
      )
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

function initTags() {
  const affixTags = filterAffixTags(routes.value)
  for (const tag of affixTags) {
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

function addTags() {
  const { name } = route
  if (name) {
    tagsViewStore.addView(route)
  }
  return false
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const tag of visitedViews.value) {
      if (tag.path === route.path) {
        scrollPaneRef.value.moveToTarget(tag)
        // 如果是激活状态，则不再执行
        if (tag.path !== route.path) {
          tagsViewStore.updateVisitedView(route)
        }
        break
      }
    }
  })
}

function refreshSelectedTag(view) {
  tagsViewStore.delCachedView(view)
  const { fullPath } = view
  nextTick(() => {
    router.replace({
      path: "/redirect" + fullPath
    })
  })
}

function closeSelectedTag(view) {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

function closeOthersTags() {
  router.push(selectedTag.value)
  tagsViewStore.delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

function closeAllTags(view) {
  tagsViewStore.delAllViews().then(({ visitedViews }) => {
    if (affixTags.value.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

function toggleFixedTag(tag) {
  if (isTagFixed(tag)) {
    tagsViewStore.removeFixedTag(tag)
  } else {
    tagsViewStore.addFixedTag(tag)
  }
}

function toLastView(visitedViews, view) {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // 如果没有标签视图，则重定向到首页
    if (view.name === "Dashboard") {
      // 重新加载当前路由
      router.replace({ path: "/redirect" + view.fullPath })
    } else {
      router.push("/")
    }
  }
}

function openMenu(tag, e) {
  // 获取当前点击的标签元素
  const tagElement = e.target.closest(".tags-view-item")
  if (!tagElement) return

  // 获取标签的位置信息
  const tagRect = tagElement.getBoundingClientRect()
  const offsetLeft = document
    .querySelector(".tags-view-container")
    .getBoundingClientRect().left
  // const menuWidth = 105 // 菜单宽度

  // 设置菜单位置在标签的正下方并水平居中
  left.value = tagRect.left - offsetLeft + 210
  top.value = tagRect.bottom // 标签底部正下方

  visible.value = true
  selectedTag.value = tag
}

function closeMenu() {
  visible.value = false
}

onMounted(() => {
  initTags()
  addTags()
})
</script>

<style scoped lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    height: 100%;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      //margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        //&:hover {
        //  background-color: #b4bccc;
        //  color: #fff;
        //}
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
