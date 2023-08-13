<template>
  <div class="w-full">
    <section v-if="showCategories" class="flex justify-center">
      <div class="columns-2 text-center space-y-5">
        <div
          v-for="category in categories"
          class="shadow-md h-20 w-40 pt-5 bg-[url('')]"
          @click="productStore.viewProducts(category)"
        >
          <p class="font-bold text-lg">{{ category }}</p>
        </div>
      </div>
    </section>
    <section>
      <div class="p-5">
        <p>All Products / {{ selectedCategory }}</p>
      </div>
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
const loading = ref(false);
const showCategories = ref(true);

//funksjoner
watch(
  () => productStore.selectedCategory,
  async (newValue) => {
    categories.value = await productStore.getCategories();
    selectedCategory.value = newValue;
  },
  { immediate: true }
);

//onMounted(() => {});
//const isTriggered = computed(() => triggerStore.state.triggered);

// functions
</script>
