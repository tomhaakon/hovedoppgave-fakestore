<template class="">
  <div class="container mx-auto px-4">
    <div class="">
      <p class="font-bold text-xl pb-5">Home</p>
    </div>
    <div class="">
      <p class="font-bold text-xl pb-5">Check out our newest items!</p>
    </div>
    <div><Product></Product></div>
  </div>
</template>
<script setup>
// import
import { useProductStore } from "@/stores/Productstore.js";
import Product from "@/components/Product.vue";

// store
const productStore = useProductStore();

//functions
productStore.viewProducts("new-products");

//end
</script>
