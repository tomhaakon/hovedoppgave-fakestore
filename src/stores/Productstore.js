import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    // variabler stores osv
    allProducts: null,
    allCategories: null,
    newestProducts: [],
  }),
  actions: {
    async getNewestProducts() {
      try {
        console.log("trying to fetch data");
        const apiCall = await fetch(
          "https://fakestoreapi.com/products?sort=dec&limit=3"
        );
        const response = await apiCall.json();
        console.log("data fethed", response);
        this.newestProducts = response;

        console.log("etter push inn i newestproducts", this.newestProducts);
      } catch (error) {
        console.error("api call failed", error);
      }
    },
  },
  getters: {},
});
