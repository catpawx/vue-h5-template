<script setup lang="ts">
import { isExternal } from "@/utils/validate";
import { computed } from "vue";

interface Props {
  icon: string;
  className?: string;
}
const props = withDefaults(defineProps<Props>(), {
  icon: "",
  className: "",
});

const isExternalIcon = computed(() => isExternal(props.icon));
const iconName = computed(() => `#icon-${props.icon}`);
const svgClass = computed(() => {
  if (props.className) {
    return "svg-icon " + props.className;
  } else {
    return "svg-icon";
  }
});
// 外链 icon
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    "-webkit-mask": `url(${props.icon}) no-repeat 50% 50%`,
  };
});
</script>

<template>
  <div
    v-if="isExternalIcon"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
