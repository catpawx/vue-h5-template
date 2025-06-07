<script setup lang="ts">
import { routeWhiteList } from "@/router/routes";

const route = useRoute();
const router = useRouter();

function onBack() {
  if (window.history.state.back) history.back();
  else router.replace("/");
}

const { t } = useI18n();

const title = computed(() => {
  if (!route.meta) return "";

  return route.meta.i18n ? t(route.meta.i18n as string) : route.meta.title || "";
});

const showLeftArrow = computed(() => route.name && routeWhiteList.includes(route.name as string));

// 在路由中设置了meta.hideNavBar，则不显示导航栏
const show = computed(() => !route.meta?.hideNavBar);
</script>

<template>
  <VanNavBar
    v-if="show"
    :title="title as string"
    :fixed="true"
    clickable
    placeholder
    :left-arrow="!showLeftArrow"
    @click-left="onBack"
  />
</template>
