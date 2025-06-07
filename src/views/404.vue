<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();
function onBack() {
  if (window.history.state.back) history.back();
  else router.replace("/");
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <van-icon name="warn-o" size="3em" />
    <div>{{ t("common.notFound") }}</div>

    <div class="mt-10">
      <van-button type="warning" @click="onBack" class="w-[500px]">{{
        t("common.back")
      }}</van-button>
    </div>
  </div>
</template>
