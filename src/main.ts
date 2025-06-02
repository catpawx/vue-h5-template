// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "@/styles/index.less";
// 引入unocss css
import "@/plugins/unocss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import { initializeDarkMode } from "@/utils/dark-mode";
initializeDarkMode();

const app = createApp(App);

// 路由
app.use(router);
// store
app.use(store);

app.mount("#app");
