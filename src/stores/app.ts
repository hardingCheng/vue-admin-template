import type { Size } from "@/plugins/element.ts"

export const useAppStore = defineStore(
  "app",
  () => {
    // setup
    const state = reactive({
      sidebar: {
        opened: true
      },
      size: "default" as Size
      // ...
      // theme
    })
    const sidebar = computed(() => state.sidebar)
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    const size = computed(() => state.size)
    const setSize = (size: Size) => {
      state.size = size
    }
    // 必须导出  state  下面持久化插件才认识，缓存
    return { state, sidebar, toggleSidebar, setSize, size }
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ["state.sidebar", "state.size"]
    }
  }
)
