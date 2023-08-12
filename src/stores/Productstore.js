import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    // variabler stores osv
    allProducts: null,
    allCategories: null,
    showDialog: false,
    showSingleProduct: null,
    showProducts: null,
    apiLink: null,
  }),
  actions: {
    viewProducts(page) {
      // new products

      console.log("viewProducts triggered");
      if (page === "new-products") {
        this.apiLink = "https://fakestoreapi.com/products?sort=desc&limit=3";
      }
      // all products
      else if (page === "all-products") {
        this.apiLink = "https://fakestoreapi.com/products";
      } else if (page === "categories") {
        this.apiLink = "https://fakestoreapi.com/products/categories";
      } else if (page === "category") {
        this.apiLink =
          "https://fakestoreapi.com/products/category/" + "placeholder";
      }
      console.log("page variabel:", page);
    },
    async getProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          const apiCall = await fetch(this.apiLink);
          //console.log("her:", this.showProducts);
          const response = await apiCall.json();
          this.allProducts = response;
          resolve(this.allProducts);
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
