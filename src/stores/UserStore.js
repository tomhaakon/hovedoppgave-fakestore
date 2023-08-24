// import
import { defineStore } from "pinia";
import { useShoppingCartStore } from "./Shoppingcartstore";
import { useNotificationStore } from "./NotificationStore";
import router from "@/router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    shoppingCartStore: useShoppingCartStore(),
    user:
      (JSON.parse(localStorage.getItem("users")) || []).find(
        (u) =>
          u.username === JSON.parse(sessionStorage.getItem("authenticated"))
      ) || null,
    users: JSON.parse(localStorage.getItem("users")) || [],
    sessionAuth: JSON.parse(sessionStorage.getItem("authenticated")),
    notify: useNotificationStore(),
    toggleRegister: false,
    registerError: false,
    errorMsg: [],
  }),

  actions: {
    register(username, password) {
      this.registerError = false;
      this.errorMsg = [];
      const user = {
        id: this.users.length + 1,
        username,
        password,
        cart: [],
        purchaseHistory: [],
      };

      //error check
        //if username is empty
      if (username === "") {
        this.errorMsg.push("Username field is empty.");
        this.registerError = true;
      }
        //if password is empty
      if (password === "") {
        this.errorMsg.push("You need to set a password.");
        this.registerError = true;
      }
        //if username exists
      if (this.users.some((user) => user.username === username)) {
        this.errorMsg.push("Username allready exists.");
        this.registerError = true;
      }
        // if no error push user
      if (!this.registerError) {
        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));
        const msg =
          "Successfully registered user " +
          user.username +
          ". You can now log in.";
        this.notify.addNotification(msg, "success", 5000);
        router.push("/");
      }
    },
    //login
    login(username, password) {
      const notify = useNotificationStore();
      const shoppingCartStore = useShoppingCartStore();
      const tempCart = [...shoppingCartStore.cart];
      if (this.user) {
        shoppingCartStore.loadCart(this.user.cart);
      }
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(
        (user) => user.username === username && user.password === password
      );

      if (userIndex !== -1) {
        // Create a copy of the user object
        const user = {
          ...users[userIndex],
          cart: [...users[userIndex].cart, ...tempCart],
        };

        // Update the user's cart in local storage
        users[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(users));

        // Update the user in the store
        this.user = user;

        // Load the user's cart into the shopping cart store
        shoppingCartStore.loadCart(user.cart);

        // Update the user in the store
        this.user = user;

        sessionStorage.setItem("authenticated", JSON.stringify(user.username));
        this.sessionAuth = user.username;
        router.push("/");
        const msg = "Successfully logged in";
        notify.addNotification(msg, "success");
      }
      return userIndex !== -1;
    },

    logout() {
      this.shoppingCartStore.loadCart(JSON.parse(localStorage.getItem("cart")));

      this.user = null;
      this.sessionAuth = null;
      sessionStorage.clear();

      const msg = "Successfully logged out";
      this.notify.addNotification(msg, "success");
      // Clear the shopping cart
      this.shoppingCartStore.cart = [];
      localStorage.removeItem("cart");
      this.notify.confirmDialog = false;
      router.push("/");
    },

    toggleView() {
      this.toggleRegister = !this.toggleRegister;
    },
    updateUser() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((u) => u.id === this.user.id);
      if (userIndex > -1) {
        users[userIndex] = this.user;
        localStorage.setItem("users", JSON.stringify(users));
      }
    },
  },
  getters: {
    isLoggedIn() {
      return this.sessionAuth != null;
    },
  },
});
