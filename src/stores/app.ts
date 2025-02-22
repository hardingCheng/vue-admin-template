export const useAppStore = defineStore(
  "app",
  () => {
    // setup
    const state = reactive({
      sidebar: {
        opened: true
      }
      // ...
      // theme
    })
    const sidebar = computed(() => state.sidebar)
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    // 必须导出  state  下面持久化插件才认识，缓存
    return { state, sidebar, toggleSidebar }
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ["state.sidebar"]
    }
  }
)
