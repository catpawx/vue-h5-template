<template>
  <div>home</div>
  <RouterLink to="/tools">Go to Tools</RouterLink>
  <div>{{ demoStore.count }}</div>
  <div>{{ demoStore.doubleCount }}</div>
  <button @click="demoStore.increment()">增加</button>
</template>

<script setup lang="ts">
import { useDemoStore } from "@/store/modules/demo";
const demoStore = useDemoStore();
</script>
