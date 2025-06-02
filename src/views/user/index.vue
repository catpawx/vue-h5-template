<script setup lang="ts">
// import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";

const mode = useDarkMode();

// 切换主题
const toggleDarkMode = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};
</script>

<template>
  <van-cell-group>
    <van-cell
      title="切换主题"
      :value="mode ? 'light' : 'dark'"
      @click="toggleDarkMode"
    />
  </van-cell-group>
</template>
