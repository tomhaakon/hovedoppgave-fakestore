import { defineStore } from "pinia";
import router from "@/router"; // Import router if you want to use it in checkout method
import { useUserStore } from "./UserStore";
import { useNotificationStore } from "./NotificationStore";

export const useShoppingCartStore = defineStore("shoppingCartStore", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    notify: useNotificationStore(),
  }),
  actions: {
    isProductInCart(productId) {
      return this.cart.some((item) => item.id === productId);
    },
    loadCart(cart) {
      this.cart = cart || [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(item) {
      this.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cart));

      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        this.addToUserCart(item);
      }
    },
    // remove from cart
    removeFromCart(itemId, quantityToRemove = 1) {
      Array.from({ length: quantityToRemove }).map(() => {
        const index = this.cart.findIndex((item) => item.id === itemId);

        if (index !== -1) {
          this.cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(this.cart));
          this.notify.addNotification("Removed item from cart", "error", 500);
        } else {
          console.log("No more items with this ID found");
        }
      });
    },

    checkout() {
      const userStore = useUserStore();

      // If the user is not logged in, redirect to the login page
      if (!userStore.user) {
        console.error("User is not logged in. Redirecting to login page.");
        router.push("/login"); // Assuming your login route is named "/login"
        return;
      }

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
      this.notify.addNotification("Checkout successfull!", "success", 3000);
      console.log("After emptying cart, user's cart:", userStore.user.cart);
      // Redirect to a confirmation or thanks page, if desired
      router.push("/thanks");

      // Clear the shopping cart

      this.cart = [];
      localStorage.removeItem("cart");
      useNotificationStore().confirmDialog = false;
    },

    // empty cart
    clearCart() {
      this.cart = [];
      router.push("/");
      useNotificationStore().confirmDialog = false;
      localStorage.removeItem("cart");
      this.notify.addNotification(
        "Cleared all items in cart.",
        "success",
        3000
      );
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
    debounce(func, delay) {
      let timerId;

      return (...args) => {
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
          func(...args);
        }, delay);
      };
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
          image: item.image,
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
