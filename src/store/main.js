import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";

const useStore = defineStore("main", {
  state: () => ({
    count: 5,
  }),

  getters: {
    double: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++;
    },
    getNews() {
      const news = apiWrapper.get("http://www.google.fr");
      return news;
    },
  },
});

export { useStore };
