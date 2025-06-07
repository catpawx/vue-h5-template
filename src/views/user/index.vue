<template>
  <div class="w-screen flex flex-col items-center">
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
        <van-cell
          :title="t('user.switchTheme')"
          :value="mode ? 'light' : 'dark'"
          @click="toggleDarkMode"
        />
        <van-cell :title="t('user.aboutUs')" @click="goAbout" />
        <van-cell
          is-link
          :title="t('setting.language')"
          :value="currentLocale.name"
          @click="showLanguagePicker = true"
        />
      </van-cell-group>
    </div>

    <div class="mt-10">
      <van-button type="primary" @click="loginOut" class="w-[500px]">{{
        t("user.logout")
      }}</van-button>
    </div>

    <van-popup v-model:show="showLanguagePicker" position="bottom">
      <van-picker
        v-model="languageValues"
        :columns="languageColumns"
        @confirm="onLanguageConfirm"
        @cancel="showLanguagePicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
import { useUserStore } from "@/store/modules/user";
import { useLocaleStore } from "@/store/modules/locale";

const { t } = useI18n();

const userStore = useUserStore();
const cachedViewStore = useCachedViewStoreHook();
const router = useRouter();

const user = userStore.user;

const mode = useDarkMode();

const localeStore = useLocaleStore();

const currentLocale = localeStore.currentLocale;
const showLanguagePicker = ref(false);
const languageValues = ref<string[]>([currentLocale.lang]);
const languageColumns = ref(
  localeStore.localeMap.map((item) => {
    return {
      text: item.name,
      value: item.lang,
    };
  })
);

const onLanguageConfirm = (value: { selectedValues: string[] }) => {
  console.log(event);
  localeStore.setCurrentLocale({
    lang: value.selectedValues[0] as LocaleType,
  });
  languageValues.value = [value.selectedValues[0]];
  showLanguagePicker.value = false;
  window.location.reload();
};

// 切换主题
const toggleDarkMode = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};

const loginOut = async () => {
  try {
    showConfirmDialog({
      title: t("common.confirmTitle"),
      message: t("common.loginOutMessage"),
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
