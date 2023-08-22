import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    // variabler stores osv
    searchResult: null,
    searchWindow: false,
    searching: null,
    isLoading: null,
    allProducts: null,
    allCategories: null,
    showDialog: false,
    showSingleProduct: null,
    showProducts: null,
    showCategory: null,
    selectedCategory: null,
    totalProducts: null,
  }),
  actions: {
    async getCategory(category) {
      try {
        this.isLoading = true;
        const apiCall = await fetch(
          "https://fakestoreapi.com/products/category/" + category
        );
        const response = await apiCall.json();
        this.showCategory = response;
        this.isLoading = false;
      } catch (error) {
        console.error("API call failed", error);
      }
    },
    async getCategories() {
      try {
        //  console.log("getCategories triggeed");
        this.isLoading = true;
        const apiCall = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const response = await apiCall.json();
        this.allCategories = response;
        this.isLoading = false;
        //  console.log("stored ", this.allCategories, "in categories");
      } catch (error) {
        console.error("API call failed", error);
        throw error; //  handle this error outside of this function
      }
    },

    viewProducts(category, pageNumber = 1, limit = 5) {
      if (category === "new-products") {
        const apiLink = "products?sort=desc&limit=" + 4;
        this.getProducts(apiLink, pageNumber, limit);
      } else if (category === "products") {
        this.getProducts("products", pageNumber, limit); // Fetch all products
      } else {
        this.getProducts("products/category/" + category, pageNumber, limit); // Fetch by specific category
        this.selectedCategory = category;
      }
    },

    async getProducts(link, pageNumber = 1, limit) {
      try {
        this.isLoading = true;
        const apiCall = await fetch("https://fakestoreapi.com/" + link);
        const response = await apiCall.json();
        const startIndex = (Number(pageNumber) - 1) * Number(limit);
        const endIndex = Number(pageNumber) * Number(limit);

        console.log("Total products fetched:", response.length);
        console.log("Start index:", startIndex, "End index:", endIndex);

        this.totalProducts = response;
        this.showProducts = response.slice(startIndex, endIndex);
        this.isLoading = false;
      } catch (error) {
        console.error("API call failed", error);
        throw error;
      }
    },
    async searchProducts() {
      try {
        this.isLoading = true;
        const apiCall = await fetch("https://fakestoreapi.com/products");
        const response = await apiCall.json();

        //   console.log("searchProducts response: ", response);
        this.searchResult = response; // Save the total products

        this.isLoading = false;
      } catch (error) {}
    },
  },
  getters: {},
});
