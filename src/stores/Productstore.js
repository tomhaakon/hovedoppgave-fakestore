import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    // variabler stores osv
    allProducts: null,
    allCategories: null,
    showDialog: false,
    showSingleProduct: null,
    showProducts: null,
    showCategory: null,
    apiLink: null,
    selectedCategory: null,
  }),
  actions: {
    async getCategory(category) {
      try {
        const apiCall = await fetch(
          "https://fakestoreapi.com/products/category/" + category
        );
        const response = await apiCall.json();
        this.showCategory = response;
      } catch (error) {
        console.error("API call failed", error);
      }
    },
    getCategories() {
      return new Promise(async (resolve, reject) => {
        try {
          const apiCall = await fetch(
            "https://fakestoreapi.com/products/categories"
          );
          const response = await apiCall.json();
          this.allCategories = response;
          resolve(this.allCategories);
        } catch (error) {
          console.error("API call failed", error);
          reject(error);
        }
      });
    },
    viewProducts(page) {
      console.log("viewProducts(", page, ")");
      // new products
      if (page === "new-products") {
        const apiLink = "products?sort=desc&limit=3";
        console.log("loading new-products");
        this.getProducts(apiLink);
      }
      // all products
      else if (page === "products") {
        const apiLink = page;
        this.getProducts(apiLink);
        // category jewlery
      } else {
        this.getProducts("products/category/" + page);
        this.selectedCategory = page;
      }
    },
    getProducts(link) {
      return new Promise(async (resolve, reject) => {
        try {
          //console.log("apilink:", this.apiLink);
          const apiCall = await fetch("https://fakestoreapi.com/" + link);
          console.log("data fetched");
          const response = await apiCall.json();
          this.showProducts = response;
          resolve(this.showProducts);
          console.log("oppdaterte this.ShowProducts:", this.showProducts);
        } catch (error) {
          console.error("API call failed", error);
          reject(error);
        }
      });
    },
    openDialog(item) {
      this.showDialog = true;
      this.showSingleProduct = item;
      // console.log("dialog open", item);
      //console.log("showDialog:", this.showDialog);
    },
    closeDialog() {
      this.showDialog = false;
      // console.log("dialog closed");
    },
    addToCart(item) {
      console.log("Added item ", item, " to cart");
    },
  },
  getters: {},
});
