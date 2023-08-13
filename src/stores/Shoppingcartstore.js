import { defineStore } from "pinia";

export const useShoppingCartStore = defineStore("shoppingCartStore", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    addToCart(item) {
      this.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(itemId) {
      const index = this.cart.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
    },
  },
  getters: {
    // You can add getters if needed
  },
});
