import { defineStore } from "pinia";

export const useShoppingCartStore = defineStore("shoppingCartStore", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    // add to cart
    addToCart(item) {
      this.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cart));
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

    // empty cart
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
    },
  },
  getters: {
    cartItemCount() {
      return this.cart.length;
    },
  },
});
