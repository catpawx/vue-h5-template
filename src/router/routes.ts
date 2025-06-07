import type { RouteRecordRaw } from "vue-router";

// 定义导航栏和标签栏可见的路由白名单
export const routeWhiteList: readonly string[] = ["Home", "Tools", "User", "Login"];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "主页",
          i18n: "router.home",
          hideNavBar: true,
        },
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具",
          i18n: "router.tools",
        },
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/user/index.vue"),
        meta: {
          title: "我的",
          i18n: "router.user",
          noCache: true,
        },
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于",
          i18n: "router.about",
          noCache: true,
        },
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: {
          title: "登录",
          i18n: "router.login",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "404",
      noCache: true,
      hideNavBar: true,
    },
  },
];

export default routes;
