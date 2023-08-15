// userStore.js
import { defineStore } from "pinia";
import router from "@/router";
import { useShoppingCartStore } from "./Shoppingcartstore";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("users")) || null,
    sessionAuth: JSON.parse(sessionStorage.getItem("authenticated")),
    toggleRegister: false,
  }),
  actions: {
    register(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the username already exists
      const usernameExists = users.some((user) => user.username === username);

      if (usernameExists) {
        // Handle the error, e.g., notify the user that the username is taken
        alert("Username already exists!");
        return;
      }

      const user = {
        id: users.length + 1,
        username,
        password,
        cart: [],
        purchaseHistory: [],
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      router.push("/");
    },
    login(username, password) {
      // Save the current cart before login
      const shoppingCartStore = useShoppingCartStore();
      const tempCart = [...shoppingCartStore.cart]; // Store the cart temporarily

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        // Load the user's cart if it exists and combine it with the temporary cart
        shoppingCartStore.loadCart([...user.cart, ...tempCart]);

        this.user = user;
        this.user.cart = [...user.cart, ...tempCart]; // Combine the carts
        this.updateUser();

        sessionStorage.setItem("authenticated", JSON.stringify(user.username));
        this.sessionAuth = user.username;
        router.push("/");
      }
      return user != null;
    },

    logout() {
      const shoppingCartStore = useShoppingCartStore();
      //      const tempCart = [...shoppingCartStore.cart]; // Store the cart temporarily

      this.user = null;
      this.sessionAuth = null;
      sessionStorage.clear();

      // Here you would update the logged-out user's cart in the local storage if needed
      // You would typically do this by updating the corresponding user object in the 'users' array

      // Clear the shopping cart
      shoppingCartStore.clearCart();
    },

    toggleView() {
      this.toggleRegister = !this.toggleRegister;
      console.log("toggleView triggered");
    },
    addToCart(item) {
      if (this.user) {
        this.user.cart.push(item);
        this.updateUser();
      }
    },
    checkout() {
      // If the user is not logged in, redirect to the login page
      if (!this.user) {
        console.error("User is not logged in. Redirecting to login page.");
        router.push("/login"); // Assuming your login route is named "/login"
        return;
      }

      if (!Array.isArray(this.user.purchaseHistory)) {
        // Handle the error appropriately
        console.error("purchaseHistory is not defined");
        return;
      }

      // Save the cart as purchase history entry
      this.user.purchaseHistory.push({
        date: new Date(),
        items: [...this.user.cart],
      });

      // Empty the cart
      this.user.cart = [];
      this.updateUser();

      // Redirect to a confirmation or thanks page, if desired
      router.push("/thanks");

      const shoppingCartStore = useShoppingCartStore();

      // Clear the shopping cart
      shoppingCartStore.clearCart();
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
