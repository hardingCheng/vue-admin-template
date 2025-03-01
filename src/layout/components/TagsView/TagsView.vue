<template>
  <div class="tags-view">
    <el-scrollbar class="tags-view-scrollbar">
      <div class="tags-view-container">
        <router-link
          v-for="tag in visitedViews"
          :key="tag.path"
          :to="{ path: tag.path, query: tag.query }"
          class="tags-view-item"
          :class="{ active: tag.path === $route.path }"
          @click.middle="closeSelectedTag(tag)"
        >
          <!-- 右键菜单 -->
          <el-dropdown
            placement="top-start"
            trigger="contextmenu"
            @command="(command) => handleCommand(command, tag)"
          >
            <span leading-28px>{{ tag.title }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item v-if="!tag.meta?.affix" command="self"
                  >关闭</el-dropdown-item
                >
                <el-dropdown-item command="refresh">刷新</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span
            v-if="!tag.meta?.affix"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
            <svg-icon icon-name="ant-design:close-outlined" />
          </span>
        </router-link>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useTagsView } from "@/stores/tagsView"
import { useRoute, useRouter } from "vue-router"
import { watch, onMounted } from "vue"
import type { TagView } from "@/stores/tagsView"

const route = useRoute()
const router = useRouter()
// 不要解构，而是保持对整个 store 的引用
const tagsViewStore = useTagsView()

// 使用计算属性来保持响应性
// 注意：不能直接解构 store（如 const { visitedViews } = useTagsView()），
// 因为这样会导致：
// 1. 失去响应性：解构会创建普通变量，不是响应式引用
// 2. 组件不会重新渲染：store 数据变化时，UI 不会更新
// 3. 单向数据流断开：修改解构变量不会影响原始 store
const visitedViews = computed(() => tagsViewStore.visitedViews)

// 处理右键菜单命令
const handleCommand = async (command: string, tag: TagView) => {
  switch (command) {
    case "other":
      await closeOthersTags(tag)
      break
    case "all":
      await closeAllTags()
      break
    case "self":
      closeSelectedTag(tag)
      break
    case "refresh":
      refreshSelectedTag(tag)
      break
  }
}

// 关闭其他标签
const closeOthersTags = async (tag: TagView) => {
  // 使用 store 中的方法
  const result = await tagsViewStore.deleteOtherViews(tag)
  // 检查是否需要导航到选中的标签
  if (tag.path !== route.path) {
    router.push({
      path: tag.path,
      query: tag.query
    })
  }
  console.log("关闭其他标签后的结果:", result)
}

// 刷新当前标签
const refreshSelectedTag = (tag: TagView) => {
  tagsViewStore.deleteCachedView(tag)
  // 使用重定向路由实现页面刷新
  // 先跳转到一个中间路由 /redirect 然后再跳回原页面
  // 这样可以强制组件重新创建，达到刷新效果
  const { path } = tag
  router.replace({
    path: "/redirect" + path
  })
}

// 关闭所有标签
const closeAllTags = async () => {
  // 使用 store 中的方法
  const result = await tagsViewStore.deleteAllViews()
  // 导航到首页
  router.push("/")
  console.log("关闭所有标签后的结果:", result)
}

// 关闭选中的标签
const closeSelectedTag = (view) => {
  tagsViewStore.deleteView(view)
  if (view.path === route.path) {
    toLastView(tagsViewStore.visitedViews, view)
  }
}

// 导航到最后一个可用的视图
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.path)
  } else {
    // 如果没有标签视图，则重定向到首页
    if (view.name === "dashboard") {
      // 如果关闭的是首页，则重新加载
      router.push({ path: "/redirect" + view.path })
    } else {
      router.push("/")
    }
  }
}

// 添加固定标签
const addAffixTags = () => {
  const routes = router.getRoutes()
  // 过滤出所有 meta.affix 为 true 的路由
  const affixRoutes = routes.filter((route) => route.meta?.affix === true)

  // 将这些路由添加到标签视图中
  affixRoutes.forEach((route) => {
    tagsViewStore.addView(route)
  })
}

// 添加 watch 监听路由变化
watch(
  () => route.path,
  () => {
    tagsViewStore.addView(route)
  }
)

// 组件挂载时添加当前路由到标签，并添加固定标签
onMounted(() => {
  addAffixTags() // 先添加固定标签
  tagsViewStore.addView(route) // 再添加当前路由
})
</script>
<style scoped lang="scss">
.tags-view {
  @apply h-[var(--tagsview-height)];
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.tags-view-scrollbar {
  height: 100%;
  width: 100%;
}

.tags-view-container {
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
  padding: 0 10px;
}

.tags-view-item {
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
  padding: 0 8px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  border-radius: 3px;
  font-size: 12px;
  color: #495060;
  background: #fff;
  cursor: pointer;
}

.tags-view-item.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.tags-view-item .el-icon-close {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}

.tags-view-item .el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
}

.tags-view-item.active .el-icon-close:hover {
  background-color: #fff;
  color: #42b983;
}
</style>
