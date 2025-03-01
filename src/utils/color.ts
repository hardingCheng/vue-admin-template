/**
 * 颜色工具函数
 *
 * 本文件提供了一系列用于颜色处理的工具函数，主要功能包括：
 * 1. 颜色格式转换：hex、rgb、rgba之间的相互转换
 * 2. 主题色生成：根据主色生成不同亮度的颜色变体
 * 3. CSS变量设置：将颜色应用到CSS变量中，实现主题切换
 * 4. 颜色混合与对比度判断：提供颜色混合和对比度相关的工具函数
 *
 * 使用方法：
 * - 更新主题色：updateThemeColor('#409EFF')
 * - 判断颜色深浅：isDarkColor('#000000')
 * - 获取对比文本颜色：getContrastTextColor('#409EFF')
 */

// color生成
// color设置
import Color from "css-color-function"

/**
 * 将hex颜色转换为rgb数组
 * @param {string} color - 十六进制颜色值
 * @returns {number[]} - RGB颜色数组
 */
export const hexToRgb = (color: string): number[] => {
  color = color.replace("#", "")
  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  return [r, g, b]
}

/**
 * 将rgb数组转换为hex颜色
 * @param {number[]} rgb - RGB颜色数组
 * @returns {string} - 十六进制颜色值
 */
export const rgbToHex = (rgb: number[]): string => {
  const [r, g, b] = rgb
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * 将颜色转换为rgba格式
 * @param {string} color - 颜色值
 * @param {number} alpha - 透明度
 * @returns {string} - rgba格式的颜色
 */
export const toRgba = (color: string, alpha: number): string => {
  const rgb = hexToRgb(color)
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
}

/**
 * 根据主色生成完整的调色板
 * @param {string} primary - 主色
 * @returns {object} - 包含各种色调的调色板
 */
export const generateColors = (primary: string) => {
  const colors: Record<string, string> = {
    primary
  }

  // 生成不同亮度的主色调
  for (let i = 1; i <= 9; i++) {
    // 浅色系列 - 使用css-color-function的tint功能
    colors[`primary-light-${i}`] = Color.convert(
      `color(${primary} tint(${i * 10}%))`
    )

    // 深色系列 - 使用css-color-function的shade功能
    colors[`primary-dark-${i}`] = Color.convert(
      `color(${primary} shade(${i * 10}%))`
    )
  }

  return colors
}

/**
 * 生成Element Plus主题变量映射
 * @param {Record<string, string>} colors - 颜色对象
 * @returns {Record<string, string>} - CSS变量映射
 */
export const generateCssVars = (
  colors: Record<string, string>
): Record<string, string> => {
  const cssVars: Record<string, string> = {}

  // 遍历颜色对象，自动生成CSS变量名
  Object.entries(colors).forEach(([key, value]) => {
    if (key === "primary") {
      cssVars["--el-color-primary"] = value
    } else if (key.startsWith("primary-light-")) {
      const lightLevel = key.replace("primary-light-", "")
      cssVars[`--el-color-primary-light-${lightLevel}`] = value
    } else if (key.startsWith("primary-dark-")) {
      const darkLevel = key.replace("primary-dark-", "")
      cssVars[`--el-color-primary-dark-${darkLevel}`] = value
    } else {
      // 处理其他可能的颜色变量
      cssVars[`--el-color-${key}`] = value
    }
  })

  return cssVars
}

/**
 * 批量设置CSS变量颜色
 * @param {Record<string, string>} colors - 颜色变量映射对象
 */
export const setColors = (colors: Record<string, string>) => {
  // 生成CSS变量映射
  const cssVars = generateCssVars(colors)

  // 更新CSS变量
  const root = document.documentElement
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

/**
 * 根据主题色更新CSS变量
 * @param {string} primary - 主题色
 */
export const updateThemeColor = (primary: string) => {
  const colors = generateColors(primary)
  setColors(colors)
}

/**
 * 混合两种颜色
 * @param {string} color1 - 第一种颜色
 * @param {string} color2 - 第二种颜色
 * @param {number} weight - 混合权重(0-1)
 * @returns {string} - 混合后的颜色
 */
export const mix = (color1: string, color2: string, weight = 0.5): string => {
  return Color.convert(`color(${color1} blend(${color2} ${weight * 100}%))`)
}

/**
 * 判断颜色是否为深色
 * @param {string} color - 颜色值
 * @returns {boolean} - 是否为深色
 */
export const isDarkColor = (color: string): boolean => {
  const rgb = hexToRgb(color)
  // 使用相对亮度公式: 0.299*R + 0.587*G + 0.114*B
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  return brightness < 128
}

/**
 * 获取适合在指定背景色上显示的文本颜色(黑或白)
 * @param {string} bgColor - 背景颜色
 * @returns {string} - 适合的文本颜色
 */
export const getContrastTextColor = (bgColor: string): string => {
  return isDarkColor(bgColor) ? "#ffffff" : "#000000"
}
