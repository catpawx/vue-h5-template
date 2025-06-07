<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed v-if="show">
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { routeWhiteList } from "@/router/routes";
import { ref, reactive } from "vue";

const route = useRoute();

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: "主页",
    to: {
      name: "Home",
    },
  },
  {
    icon: "gem-o",
    title: "工具",
    to: {
      name: "Tools",
    },
  },
  {
    icon: "user-o",
    title: "我的",
    to: {
      name: "User",
    },
  },
]);
console.log(route.path);
const show = computed(() => route.name && routeWhiteList.includes(route.name as string));
</script>
