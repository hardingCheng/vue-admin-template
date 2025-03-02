/**
 * 主题生成与应用钩子函数
 *
 * 功能描述：
 * - 监听主题颜色变化，动态生成并应用主题色系
 * - 基于主色调生成一系列衍生色（浅色和深色变体）
 * - 将生成的颜色应用到全局 CSS 变量中
 *
 * 工作原理：
 * 1. 通过 watchEffect 监听主题色变化
 * 2. 当主题色发生变化时，生成一系列衍生色
 * 3. 调用 setColors 方法将颜色应用到 CSS 变量
 * 4. 更新 store 中的 originalThemeColor 值，避免重复处理
 *
 * 使用方式：
 * - 在应用初始化时调用此钩子
 * - 可在任何组件中通过修改 store.settings.themeColor 触发主题更新
 */
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
