import { useSettingsStore } from "@/stores/settings"
import { generateColors, setColors } from "@/utils/color"

export const useGenerateTheme = () => {
  // 监控主题的变化，跟新到store中
  // 生成主题更新

  const store = useSettingsStore()
  const themeColor = computed(() => store.settings.themeColor)
  const originalThemeColor = computed(() => store.settings.originalThemeColor)

  watchEffect(() => {
    if (themeColor.value !== originalThemeColor.value) {
      const colors = {
        primary: themeColor.value, // priamry
        ...generateColors(themeColor.value) // primary-light-1/9
      }
      setColors(colors)
      store.changeSettings({
        key: "originalThemeColor",
        value: themeColor.value
      })
    }
  })
}
