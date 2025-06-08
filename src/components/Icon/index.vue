<!-- components/Icon.vue -->
<template>
  <!-- 本地 SVG 图标 -->
  <SvgIcon v-if="isLocal" :name="symbolId" />

  <!-- Iconify 图标 -->
  <span v-else :class="symbolId" />
</template>

<script setup>
import { computed } from "vue";
import SvgIcon from "./SvgIcon.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const isLocal = computed(() => props.name?.startsWith("svg-icon:"));
const symbolId = computed(() => {
  return unref(isLocal) ? `${props.name.split("svg-icon:")[1]}` : `i-${props.name}`;
});
</script>
