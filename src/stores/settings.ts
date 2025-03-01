import varaibles from "@/style/variables.module.scss"
import { reactive } from "vue"

export const useSettingsStore = defineStore(
  "settings",
  () => {
    // 添加主题色相关方法
    const settings = reactive({
      themeColor: varaibles.themeColor,
      originalThemeColor: "",
      showLogo: true // 添加控制是否显示logo的配置项
    })
    type ISetting = typeof settings

    const changeSettings = <T extends keyof ISetting>({
      key,
      value
    }: {
      key: T
      value: ISetting[T]
    }) => {
      settings[key] = value
    }

    const setThemeColor = (key: keyof ISetting, color: string) => {
      changeSettings({ key, value: color })
    }

    return {
      settings,
      changeSettings,
      setThemeColor,
      themeColor: computed(() => settings.themeColor),
      showLogo: computed(() => settings.showLogo) // 导出showLogo的计算属性
    }
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ["settings.themeColor", "settings.showLogo"] // 添加showLogo到持久化列表
    }
  }
)
