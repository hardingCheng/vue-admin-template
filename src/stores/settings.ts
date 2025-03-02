import varaibles from "@/style/variables.module.scss"
import { reactive } from "vue"

export const useSettingsStore = defineStore(
  "settings",
  () => {
    // 添加主题色相关方法
    const settings = reactive({
      themeColor: varaibles.themeColor,
      originalThemeColor: "",
      showLogo: true,
      showTagsView: true
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
      showLogo: computed(() => settings.showLogo),
      showTagsView: computed(() => settings.showTagsView)
    }
  },
  {
    persist: {
      storage: window.localStorage,
      pick: [
        "settings.themeColor",
        "settings.showLogo",
        "settings.showTagsView"
      ]
    }
  }
)
