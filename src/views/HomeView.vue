<template class="">
  <div class="container mx-auto px-4">
    <div class="">
      <p class="font-bold text-xl pb-5">Home</p>
    </div>
    <div><Product></Product></div>
  </div>
</template>
<script setup>
console.log("Hjemmesiden loaded");
import { useProductStore } from "@/stores/Productstore.js";
import { ref, computed } from "vue";
import Product from "@/components/Product.vue";
// store
const productStore = useProductStore();
productStore.viewProducts("new-products");
console.log("trying to load products");

// refs
//const products = ref([]);
// functions

//productStore.searchProducts();

// const filteredItems = computed(() => {
//   return productStore.searchResult.filter((item) =>
//     item.title.toLowerCase().includes(productStore.searching.toLowerCase())
//   );
// });

// const highlightSearchTerm = (title) => {
//   const searchTerm = productStore.searching.toLowerCase();
//   const parts = title.split(new RegExp(`(${searchTerm})`, "ig"));
//   return parts
//     .map((part) => {
//       if (part.toLowerCase() === searchTerm) {
//         return `<span class="bg-accent">${part}</span>`;
//       } else {
//         return part;
//       }
//     })
//     .join("");
// };
</script>
