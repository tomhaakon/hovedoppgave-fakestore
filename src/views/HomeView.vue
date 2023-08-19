<template class="">
  <div class="container mx-auto px-4">
    <div v-if="productStore.searching">{{ productStore.searching }}</div>
    <div v-else>
      <div class="">
        <p class="font-bold text-xl pb-5">Home</p>
      </div>
      <div><Product></Product></div>
    </div>
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
