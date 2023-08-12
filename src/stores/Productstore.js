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
        this.apiLink = "products?sort=desc&limit=3";
        this.getProducts();
      }
      // all products
      else if (page === "products") {
        this.apiLink = page;
        this.getProducts();
      } else if (page === "jewelery") {
        this.apiLink = "products/category/" + page;
        this.getProducts();
      }
      //  console.log("page variabel:", page);
    },
    getProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("apilink:", this.apiLink);
          const apiCall = await fetch(
            "https://fakestoreapi.com/" + this.apiLink + "/"
          );
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
