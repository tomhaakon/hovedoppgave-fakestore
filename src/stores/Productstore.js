import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    // variabler stores osv
    searching: null,
    isLoading: null,
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
    async getCategories() {
      try {
        const apiCall = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const response = await apiCall.json();
        this.allCategories = response;
      } catch (error) {
        console.error("API call failed", error);
        throw error; // If you want to handle this error outside of this function
      }
    },

    viewProducts(page, pageNumber = 1, limit = 5) {
      console.log("viewProducts(", page, ")");
      if (page === "new-products") {
        const apiLink = "products?sort=desc&limit=" + 3; // Use passed limit
        this.getProducts(apiLink, pageNumber, limit);
      } else if (page === "products") {
        this.getProducts(page, pageNumber, limit);
      } else {
        this.getProducts("products/category/" + page, pageNumber, limit);
        this.selectedCategory = page;
      }
    },

    async getProducts(link, pageNumber = 1, limit) {
      // Make sure to provide a value for the limit parameter when calling this function
      if (!limit) {
        console.error("Limit must be provided");
        return;
      }

      try {
        console.log("link", link);
        this.isLoading = true;
        const apiCall = await fetch("https://fakestoreapi.com/" + link);
        const response = await apiCall.json();

        // Determine the starting index for the current page
        const startIndex = (pageNumber - 1) * limit;
        // Determine the ending index for the current page
        const endIndex = pageNumber * limit;

        this.totalProducts = response; // Save the total products
        console.log(response);
        this.isLoading = false;
        // Slice the products to get only the products for the current page
        this.showProducts = response.slice(startIndex, endIndex);

        // console.log("this.showPridocts", this.showProducts);
        // console.log("Page Number:", pageNumber);
        // console.log("Limit:", limit);
        // console.log("Start Index:", startIndex);
        // console.log("End Index:", endIndex);
        // console.log("Fetched Products:", response);
        // console.log("Sliced Products:", this.showProducts);

        // return this.showProducts; // Return the products for the current page
      } catch (error) {
        console.error("API call failed", error);
        throw error; // If you want to handle this error outside of this function
      }
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
