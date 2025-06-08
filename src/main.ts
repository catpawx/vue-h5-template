// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "@/styles/index.less";
// 引入unocss css
import "@/plugins/unocss";
// svg icon
import "virtual:svg-icons-register";
// 初始化多语言
import { setupI18n } from "@/plugins/vueI18n";

// 引入状态管理
import { setupStore } from "@/store";

// 路由
import router, { setupRouter } from "@/router";

import { createApp } from "vue";
import App from "./App.vue";

import { initializeDarkMode } from "@/utils/dark-mode";
initializeDarkMode();

// 创建实例
const setupAll = async () => {
  const app = createApp(App);

  await setupI18n(app);

  setupStore(app);

  setupRouter(app);

  // setupStore(app)

  // setupGlobCom(app)

  // setupElementPlus(app)

  // setupFormCreate(app)

  // setupRouter(app)

  await router.isReady();

  app.mount("#app");
};

setupAll();
