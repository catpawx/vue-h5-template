<script setup lang="ts">
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
import { useDarkMode } from "@/hooks/useToggleDarkMode";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <!-- <nav-bar /> -->
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <tabbar />
    </van-config-provider>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
