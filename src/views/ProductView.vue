<template>
  <div class="w-full">
    <section v-if="showCategories" class="bg-red-500 flex justify-center">
      <div class="columns-2 text-center bg-yellow-300 space-y-5">
        <div
          v-for="category in categories"
          class="bg-green-500 h-20 w-40 pt-5 bg-[url('')]"
          @click="productStore.viewProducts(category)"
        >
          <p class="font-bold text-lg">{{ category }}</p>
        </div>
      </div>
    </section>
    <div class="">
      <section v-if="showProducts">
        <div class="p-5">
          <p class="text-md">All Products</p>
        </div>
        <Product></Product>
      </section>
    </div>
  </div>
</template>
<script setup>
//imports
import { useProductStore } from "@/stores/Productstore.js";
import { ref, onMounted } from "vue";
import Product from "@/components/Product.vue";
console.log("Productpage loaded");
// store
const productStore = useProductStore();
productStore.viewProducts("products");
productStore.getCategories();
//variabler
const categories = ref();
const products = ref();
const getImg = ref();

//funksjoner
// onMounted(async () => {
//   categories.value = await productStore.getCategories();
//   products.value = await productStore.viewProducts("products");
// });

const getCategoryImage = () => {
  console.log("getCategoryImage triggered");

  let productData = null;
  for (productData in getImg.value) {
    console.log("s");
  }
};
getCategoryImage();

// refs
const showProducts = ref(true);
const showCategories = ref(true);

//onMounted(() => {});
//const isTriggered = computed(() => triggerStore.state.triggered);

// functions
</script>
