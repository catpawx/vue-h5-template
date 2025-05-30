import { defineStore } from "pinia";
import { store } from "@/store";

export const useDemoStore = defineStore("demo", {
  state: () => ({
    count: 1,
    name: "demo",
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export const useDemoStoreHook = () => {
  return useDemoStore(store);
};
