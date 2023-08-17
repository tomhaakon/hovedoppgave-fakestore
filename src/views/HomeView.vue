<template class="">
  <div class="container mx-auto px-4">
    <div class="p-5">
      <p class="text-md">Check out our newest items!</p>
    </div>
    <div><Product></Product></div>
  </div>
</template>
<script setup>
console.log("Hjemmesiden loaded");
import { useProductStore } from "@/stores/Productstore.js";
import { ref, onMounted } from "vue";
import Product from "@/components/Product.vue";
// store
const productStore = useProductStore();
productStore.viewProducts("new-products");
console.log("trying to load products");

// refs
const products = ref([]);
// functions
</script>
