<template>
  <van-button type="primary" @click="showToastStub">
    show vant toast
  </van-button>
</template>

<script setup lang="ts">
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

<style scoped></style>
