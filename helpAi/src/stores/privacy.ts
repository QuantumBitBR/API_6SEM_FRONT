import { defineStore } from "pinia";

export const usePrivacyStore = defineStore("privacy", {
  state: () => ({
    isAccepted: localStorage.getItem("is_accept_unmandatory") === "true"
  }),
  actions: {
    update(value: boolean) {
      this.isAccepted = value;
      localStorage.setItem("is_accept_unmandatory", value ? "true" : "false");
    }
  }
});
