<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

const tagAndTagSpacing = 4

const scrollContainer = ref(null)
const scrollWrapper = computed(() => scrollContainer.value?.wrap$)

const emits = defineEmits(["scroll"])

function handleScroll(e) {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
  emits("scroll")
}

function moveToTarget(currentTag) {
  if (
    !scrollContainer.value ||
    !scrollContainer.value.$el ||
    !scrollWrapper.value
  ) {
    return
  }

  const $container = scrollContainer.value.$el
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = scrollWrapper.value

  let firstTag = null
  let lastTag = null

  // 找到第一个和最后一个tag元素
  const tagList = $container.querySelectorAll(".tags-view-item")
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    // 找到当前标签的前一个和后一个元素
    const currentIndex = Array.from(tagList).findIndex(
      (item) => item === currentTag
    )
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // 标签在可视区域中间
    const afterNextTagOffsetLeft =
      nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({
  moveToTarget
})

onMounted(() => {
  if (scrollWrapper.value) {
    scrollWrapper.value.addEventListener("scroll", emitScroll, true)
  }
})

onBeforeUnmount(() => {
  if (scrollWrapper.value) {
    scrollWrapper.value.removeEventListener("scroll", emitScroll)
  }
})

function emitScroll() {
  emits("scroll")
}
</script>

<style scoped lang="scss">
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
