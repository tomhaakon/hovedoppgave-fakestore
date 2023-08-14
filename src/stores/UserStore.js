// userStore.js
import { defineStore } from "pinia";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("users")) || null,
    toggleRegister: false,
  }),
  actions: {
    register(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
    },
    login(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        this.user = user;
      }
      return user != null;
    },
    logout() {
      this.user = null;
    },
    toggleView() {
      this.toggleRegister = !this.toggleRegister;
      console.log("toggleView triggered");
    },
  },
  getters: {},
});
