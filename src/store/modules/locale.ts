import { defineStore } from "pinia";
import { store } from "../index";
import { CACHE_KEY, useCache } from "@/hooks/useCache";
import { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";
import zhCN from "vant/es/locale/lang/zh-CN";

export interface LocaleDropdownType {
  lang: LocaleType;
  name?: string;
}

const { wsCache } = useCache();

interface LocaleState {
  currentLocale: LocaleDropdownType;
  localeMap: LocaleDropdownType[];
}

const vantLocales = {
  "zh-CN": zhCN,
  en: enUS,
};

export const useLocaleStore = defineStore("locales", {
  state: (): LocaleState => {
    return {
      currentLocale: {
        lang: wsCache.get(CACHE_KEY.LANG) || "zh-CN",
      },
      // 多语言
      localeMap: [
        {
          lang: "zh-CN",
          name: "简体中文",
        },
        {
          lang: "en",
          name: "English",
        },
      ],
    };
  },
  getters: {
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale;
    },
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap;
    },
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      this.currentLocale.lang = localeMap?.lang;
      wsCache.set(CACHE_KEY.LANG, localeMap?.lang);
      // 通过lang找到localeMap中的name
      const name = this.localeMap.find((item) => item.lang === localeMap?.lang)?.name;
      this.currentLocale.name = name;
      // 设置 vant 组件语言包
      Locale.use(localeMap?.lang, vantLocales[localeMap?.lang]);
    },
  },
});

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store);
};
