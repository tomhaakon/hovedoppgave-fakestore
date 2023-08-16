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
    totalProducts: null,
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
    viewProducts(page, pageNumber = 1, limit = 5) {
      console.log("viewProducts(", page, ")");
      if (page === "new-products") {
        const apiLink = "products?sort=desc&limit=" + limit; // Use passed limit
        this.getProducts(apiLink, pageNumber, limit);
      } else if (page === "products") {
        this.getProducts(page, pageNumber, limit);
      } else {
        this.getProducts("products/category/" + page, pageNumber, limit);
        this.selectedCategory = page;
      }
    },

    getProducts(link, pageNumber = 1, limit) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("link", link);
          const apiCall = await fetch("https://fakestoreapi.com/" + link);
          //console.log("data fetched");
          const response = await apiCall.json();
          // Determine the starting index for the current page
          const startIndex = (pageNumber - 1) * limit;
          // Determine the ending index for the current page
          const endIndex = pageNumber * limit;

          this.totalProducts = response; // Save the total products
          // Slice the products to get only the products for the current page

          this.showProducts = response.slice(startIndex, endIndex);

          resolve(this.showProducts);

          console.log("this.showPridocts", this.showProducts);
          console.log("Page Number:", pageNumber);
          console.log("Limit:", limit);
          console.log("Start Index:", startIndex);
          console.log("End Index:", endIndex);
          console.log("Fetched Products:", response);
          console.log("Sliced Products:", this.showProducts);

          // console.log("Updated this.ShowProducts:", this.showProducts);
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
