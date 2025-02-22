import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "normalize.css/normalize.css"
import { createPinia } from "pinia"
// import ElementPlus from "element-plus"
// import "element-plus/dist/index.css"
import element from "@/plugins/element.ts"
import "@/style/index.scss"
import "uno.css"
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(element)
app.mount("#app")
