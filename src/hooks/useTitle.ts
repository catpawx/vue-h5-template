import { watch, ref } from "vue";
import { isString } from "@/utils/is";

export const useTitle = (newTitle?: string) => {
  const appTitle = import.meta.env.VITE_APP_TITLE;

  const title = ref(newTitle ? `${appTitle} - ${newTitle}` : appTitle);

  watch(
    title,
    (n, o) => {
      if (isString(n) && n !== o && document) {
        document.title = n;
      }
    },
    { immediate: true }
  );

  return title;
};
