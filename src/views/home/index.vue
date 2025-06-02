<template>
  <div>home</div>
  <RouterLink to="/tools">Go to Tools</RouterLink>
  <div>{{ demoStore.count }}</div>
  <div>{{ demoStore.doubleCount }}</div>
  <button @click="demoStore.increment()">增加</button>
  <br />
  <van-button type="primary" @click="showToastStub">
    show vant toast
  </van-button>
</template>

<script setup lang="ts">
import { useDemoStore } from "@/store/modules/demo";
import { onActivated, onMounted } from "vue";
const demoStore = useDemoStore();

onMounted(() => {
  console.log("🚀🚀🚀======>>>onMounted");
});
onActivated(() => {
  console.log("🚀🚀🚀======>>>onActivated");
});

const showToastStub = () => {
  showToast("No need to import showToast");
};
</script>
