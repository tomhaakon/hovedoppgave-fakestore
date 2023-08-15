// userStore.js
import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("users")) || null,
    sessionAuth: JSON.parse(sessionStorage.getItem(["id", "authenticated"])),
    toggleRegister: false,
  }),
  actions: {
    register(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = { id: users.length + 1, username, password };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      router.push("/");
    },

    login(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        this.user = user;
        sessionStorage.setItem(
          ["id", "authenticated"],
          JSON.stringify([user.id, user.username])
        );
        this.sessionAuth = user.username;
        router.push("/");
      }
      return user != null;
    },
    logout() {
      this.user = null;
      this.sessionAuth = null;
      sessionStorage.clear();
    },
    toggleView() {
      this.toggleRegister = !this.toggleRegister;
      console.log("toggleView triggered");
    },
  },
  getters: {},
});
