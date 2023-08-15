import { defineStore } from "pinia";
import router from "@/router";
import { useShoppingCartStore } from "./Shoppingcartstore";

export const useUserStore = defineStore("userStore", {
  state: () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const sessionAuth = JSON.parse(sessionStorage.getItem("authenticated"));
    const user = users.find((u) => u.username === sessionAuth);
    return {
      user: user || null,
      sessionAuth,
      toggleRegister: false,
    };
  },
  actions: {
    register(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const usernameExists = users.some((user) => user.username === username);

      if (usernameExists) {
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

        console.log("login:user.cart", user.cart);
        console.log("login:tempCart", tempCart);

        sessionStorage.setItem("authenticated", JSON.stringify(user.username));
        this.sessionAuth = user.username;
        router.push("/");
      }
      return userIndex !== -1;
    },

    logout() {
      const shoppingCartStore = useShoppingCartStore();
      //      const tempCart = [...shoppingCartStore.cart]; // Store the cart temporarily
      shoppingCartStore.loadCart(JSON.parse(localStorage.getItem("cart")));

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

    // addToUserCart(item) {
    //   if (this.user) {
    //     this.user.cart.push(item);
    //     this.updateUser();
    //   }
    // },
    // checkout() {
    //   console.log("Before checkout, user's cart:", this.user.cart);

    //   // If the user is not logged in, redirect to the login page
    //   if (!this.user) {
    //     console.error("User is not logged in. Redirecting to login page.");
    //     router.push("/login"); // Assuming your login route is named "/login"
    //     return;
    //   } else {
    //     const shoppingCartStore = useShoppingCartStore();

    //     if (!Array.isArray(this.user.purchaseHistory)) {
    //       // Handle the error appropriately
    //       console.error("purchaseHistory is not defined");
    //       return;
    //     }
    //     // Save the cart as purchase history entry
    //     this.user.purchaseHistory.push({
    //       date: new Date(),
    //       items: [...this.user.cart],
    //     });
    //     console.log(
    //       "After saving to purchase history, user's cart:",
    //       this.user.cart
    //     );

    //     // Empty the cart
    //     this.user.cart = [];
    //     this.updateUser();
    //     console.log("After emptying cart, user's cart:", this.user.cart);

    //     // Redirect to a confirmation or thanks page, if desired
    //     router.push("/thanks");

    //     // Clear the shopping cart
    //     shoppingCartStore.clearCart();
    //   }
    // },

    updateUser() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((u) => u.id === this.user.id);
      if (userIndex > -1) {
        console.log("Before updating user in local storage:", users[userIndex]);
        users[userIndex] = this.user;
        localStorage.setItem("users", JSON.stringify(users));
        console.log("After updating user in local storage:", users[userIndex]);
      }
    },
  },
  getters: {
    isLoggedIn() {
      return this.sessionAuth != null;
    },
  },
});
