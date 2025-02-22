import { defineConfig } from "unocss"
import presetAttributify from "@unocss/preset-attributify"
import presetUno from "@unocss/preset-uno"
import transformDirective from "@unocss/transformer-directives"
// unocss图标预设会查找 依赖的图标库
// ant-design
import presetIcons from "@unocss/preset-icons"
export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetIcons()],
  transformers: [transformDirective()], // apply
  shortcuts: [["icon", "inline-block w-1em h-1em align-middle text-current"]]
})
