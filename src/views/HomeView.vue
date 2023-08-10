<template>
  <p>hei</p>
  <div v-for="product in products">{{ product.title }} s</div>
</template>
<script setup>
import { useProductStore } from "@/stores/Productstore.js";
import { ref } from "vue";

// store
const productStore = useProductStore();
productStore.getNewestProducts();
// refs
const products = productStore.newestProducts;

console.log("ProductView.vue LOG", products);

//functions
</script>
