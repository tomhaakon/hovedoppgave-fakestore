import { defineStore } from "pinia";

export const useShoppingCartStore = defineStore("shoppingCartStore", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    loadCart(cart) {
      this.cart = cart || [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
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
