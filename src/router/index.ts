import { createRouter, createWebHashHistory, type RouteLocationNormalized } from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
import NProgress from "@/utils/progress";
import { useTitle } from "@/hooks/useTitle";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}

router.beforeEach((to: toRouteType, from, next) => {
  NProgress.start();
  // 路由缓存
  useCachedViewStoreHook().addCachedView(to);
  // 页面 title
  useTitle(to?.meta?.title as string);
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
