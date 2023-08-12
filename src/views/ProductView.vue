<template>
  <div class="w-full">
    <section v-if="showCategories" class="flex justify-center">
      <div class="columns-2 text-center space-y-5">
        <div
          v-for="category in categories"
          class="shadow-lg h-20 w-40 pt-5 bg-[url('')]"
          @click="productStore.viewProducts(category)"
        >
          <p class="font-bold text-lg">{{ category }}</p>
        </div>
      </div>
    </section>
    <section v-if="showProducts">
      <div v-if="selectedCategory" class="p-5">
        <p>Products / {{ selectedCategory }}</p>
      </div>
      <div v-else class="p-5"><p>All products</p></div>
      <Product></Product>
    </section>
  </div>
</template>
<script setup>
//imports
import { useProductStore } from "@/stores/Productstore.js";
import { watch, ref, onMounted } from "vue";
import Product from "@/components/Product.vue";
console.log("Productpage loaded");
// store
const productStore = useProductStore();
productStore.viewProducts("products");
productStore.getCategories();
//variabler
const categories = ref();
const selectedCategory = ref();
//const products = ref();
//const getImg = ref();

//funksjoner
onMounted(async () => {
  categories.value = await productStore.getCategories();
});
watch(
  () => productStore.selectedCategory,
  (newValue) => {
    selectedCategory.value = newValue;
  }
);

// const getCategoryImage = () => {
//   console.log("getCategoryImage triggered");

//   let productData = null;
//   for (productData in getImg.value) {
//     console.log("s");
//   }
// };
//getCategoryImage();

// refs
const showProducts = ref(true);
const showCategories = ref(true);

//onMounted(() => {});
//const isTriggered = computed(() => triggerStore.state.triggered);

// functions
</script>
