<template class="">
  <div class="">
    <div class="p-5">
      <p class="text-md">Check out our newest items!</p>
    </div>
    <div><Product></Product></div>
  </div>
</template>
<script setup>
import { useProductStore } from "@/stores/Productstore.js";
import { ref, onMounted } from "vue";
import Product from "@/components/Product.vue";
// store
const productStore = useProductStore();
productStore.viewProducts("new-products");
console.log("Hjemmesiden loaded");
// refs
const products = ref([]);
//onMounted(() => {});

// functions
</script>
