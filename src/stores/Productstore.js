import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    //variables
    showPictureWindow: null,
    searchWindow: false,
    searching: null,
    searchResult: null,
    isLoading: null,
    allCategories: null,
    showProducts: null,
    showCategory: null,
    selectedCategory: null,
    totalProducts: null,
  }),
  actions: {
    //get single category from API
    async getCategory(category) {
      try {
        this.isLoading = true;
        const apiCall = await fetch(
          `https://fakestoreapi.com/products/category/${category}`,
        );
        const response = await apiCall.json();
        this.showCategory = response;
        this.isLoading = false;
      } catch (error) {
        console.error("API call failed", error);
      }
    },
    //get all categories from API
    async getCategories() {
      try {
        this.isLoading = true;
        const apiCall = await fetch(
          "https://fakestoreapi.com/products/categories",
        );
        const response = await apiCall.json();
        this.allCategories = response;
        this.isLoading = false;
      } catch (error) {
        console.error("API call failed", error);
      }
    },
    //view products based on  4 new-products, all products or products in a category
    viewProducts(category, pageNumber = 1, limit = 5) {
      //fetch 4 new products from API
      if (category === "new-products") {
        const apiLink = "products?sort=desc&limit=" + 4;
        this.getProducts(apiLink, pageNumber, limit);
      }
      //fetch all products from API
      else if (category === "products") {
        this.getProducts("products", pageNumber, limit); // Fetch all products
      }
      //fetch products in a category from API
      else {
        this.getProducts("products/category/" + category, pageNumber, limit); // Fetch by specific category
        this.selectedCategory = category;
      }
    },
    //get products fetch API
    async getProducts(link, pageNumber = 1, limit) {
      try {
        this.isLoading = true;
        const apiCall = await fetch(`https://fakestoreapi.com/${link}`);
        const response = await apiCall.json();
        const startIndex = (Number(pageNumber) - 1) * Number(limit);
        const endIndex = Number(pageNumber) * Number(limit);

        this.totalProducts = response;
        this.showProducts = response.slice(startIndex, endIndex);
        this.isLoading = false;
      } catch (error) {
        console.error("API call failed", error);
        throw error;
      }
    },
    //fetch all products for search array
    async searchProducts() {
      try {
        this.isLoading = true;
        const apiCall = await fetch("https://fakestoreapi.com/products");
        const response = await apiCall.json();

        // Save the total products
        this.searchResult = response;

        this.isLoading = false;
      } catch (error) {}
    },
    //showing fullscreen picture of product image
    showBigPicture() {
      this.showPictureWindow = !this.showPictureWindow;
    },
  },
  getters: {},
});
