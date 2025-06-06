<template>
  <div
    class="h-screen w-screen flex flex-col items-center"
    style="background-color: var(--color-background)"
  >
    <div class="w-screen">
      <div
        class="h-200px flex items-center p-4 mb-4"
        style="background-color: var(--color-background-2)"
      >
        <van-space>
          <van-image
            round
            width="60px"
            height="60px"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <van-space direction="vertical">
            <span class="text-md font-bold">{{ user.nickname }}</span>
          </van-space>
        </van-space>
      </div>

      <van-cell-group>
        <van-cell title="切换主题" :value="mode ? 'light' : 'dark'" @click="toggleDarkMode" />
        <van-cell title="关于我们" @click="goAbout" />
      </van-cell-group>
    </div>

    <div class="bottom-20 fixed">
      <van-button type="primary" @click="loginOut" class="w-[500px]">退出登录</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
import { useUserStore } from "@/store/modules/user";

import { useRouter } from "vue-router";

const userStore = useUserStore();
const cachedViewStore = useCachedViewStoreHook();
const router = useRouter();

console.log(userStore);

const user = userStore.user;

const mode = useDarkMode();

// 切换主题
const toggleDarkMode = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};

const loginOut = async () => {
  try {
    showConfirmDialog({
      title: "提示",
      message: "确定退出登录吗？",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    }).then(async () => {
      await userStore.loginOut();
      cachedViewStore.delAllCachedViews();
      router.replace("/login");
    });
  } catch {}
};

const goAbout = () => {
  router.push("/about");
};
</script>
