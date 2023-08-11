import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    // variabler stores osv
    allProducts: null,
    allCategories: null,
    newestProducts: null,
    showDialog: false,
    showProduct: null,
  }),
  actions: {
    async getNewestProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          const apiCall = await fetch(
            "https://fakestoreapi.com/products?sort=dec&limit=3"
          );
          const response = await apiCall.json();
          this.newestProducts = response;
          resolve(this.newestProducts);
        } catch (error) {
          console.error("API call failed", error);
          reject(error);
        }
      });
    },
    openDialog(item) {
      this.showDialog = true;
      this.showProduct = item;
      console.log("dialog open", item);
      console.log("showDialog:", this.showDialog);
    },
    closeDialog() {
      this.showDialog = false;
      console.log("dialog closed");
    },
    addToCart(item) {
      console.log("Added item ", item, " to cart");
    },
  },
  getters: {},
});
