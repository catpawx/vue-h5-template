<template>
  <!-- 本地 SVG 图标 -->
  <SvgIcon v-if="isLocal" :icon="icon as string" />

  <!-- Iconify 图标 -->
  <Icon v-else :icon="icon" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import SvgIcon from "./SvgIcon.vue";
import { Icon } from "@iconify/vue";
import type { IconifyIcon } from "@iconify/vue";

const props = defineProps<{
  icon: string | IconifyIcon;
}>();

const isLocal = computed(
  () => typeof props.icon === "string" && props.icon?.startsWith("svg-icon:")
);
const icon = computed(() => {
  return unref(isLocal) ? `${(props.icon as string).split("svg-icon:")[1]}` : props.icon;
});
console.log("icon", icon.value);
</script>
