import { defineStore } from "pinia";
import router from "@/router"; // Import router if you want to use it in checkout method
import { useUserStore } from "./UserStore";

export const useShoppingCartStore = defineStore("shoppingCartStore", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    loadCart(cart) {
      this.cart = cart || [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(item) {
      this.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cart));

      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        userStore.addToUserCart(item);
      }
    },
    // remove from cart
    removeFromCart(itemId, quantityToRemove = 1) {
      for (let i = 0; i < quantityToRemove; i++) {
        const index = this.cart.findIndex((item) => item.id === itemId);

        if (index !== -1) {
          this.cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(this.cart));
        } else {
          console.log("No more items with this ID found");
          break;
        }
      }
    },
    checkout() {
      const userStore = useUserStore();

      console.log("Before checkout, user's cart:", userStore.user.cart);

      // If the user is not logged in, redirect to the login page
      if (!userStore.user) {
        console.error("User is not logged in. Redirecting to login page.");
        router.push("/login"); // Assuming your login route is named "/login"
        return;
      } else {
        if (!Array.isArray(userStore.user.purchaseHistory)) {
          // Handle the error appropriately
          console.error("purchaseHistory is not defined");
          return;
        }

        // Save the cart as purchase history entry
        userStore.user.purchaseHistory.push({
          date: new Date(),
          items: [...userStore.user.cart],
        });

        console.log(
          "After saving to purchase history, user's cart:",
          userStore.user.cart
        );

        // Empty the user's cart
        userStore.user.cart = [];
        userStore.updateUser();

        console.log("After emptying cart, user's cart:", userStore.user.cart);

        // Redirect to a confirmation or thanks page, if desired
        router.push("/thanks");

        // Clear the shopping cart
        this.clearCart();
      }
    },

    // empty cart
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
    },
    addToUserCart(item) {
      const userStore = useUserStore();

      // Ensure that the user is logged in
      if (!userStore.user) {
        console.error("User is not logged in. Redirecting to login page.");
        router.push("/login"); // Assuming your login route is named "/login"
        return;
      }

      // Add the item to the user's cart
      userStore.user.cart.push(item);

      // Update the user's information
      userStore.updateUser();
    },
  },
  getters: {
    cartItemCount() {
      return this.cart.length;
    },
    groupedCart() {
      const counts = {};
      this.cart.forEach((item) => {
        counts[item.id] = (counts[item.id] || 0) + 1;
      });
      return Object.keys(counts).map((id) => {
        const item = this.cart.find((item) => item.id == id);
        return {
          id: +id,
          title: item.title,
          price: item.price, // Add the price here
          count: counts[id],
        };
      });
    },
    totalPrice() {
      return this.groupedCart.reduce((sum, item) => {
        return sum + Math.round(item.price * 10 * item.count);
      }, 0);
    },
  },
});
