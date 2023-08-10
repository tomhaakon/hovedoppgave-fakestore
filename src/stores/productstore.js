import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    // variabler stores osv
    allProducts: null,
  }),
  actions: {
    async getAllProducts() {
      try {
        console.log("trying to fetch data");
        const apiCall = await fetch("https://fakestoreapi.com/products");
        const response = await apiCall.json();
        console.log("data fethed", response);
        this.allProducts = response;
        console.log(this.allProducts);
      } catch (error) {
        console.error("api call failed", error);
      }
    },
  },
  getters: {},
});
