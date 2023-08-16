<template>
  <div class="w-full">
    <section v-if="showCategories" class="flex justify-center pt-5">
      <div class="columns-2 text-center space-y-5">
        <div
          v-for="category in categories"
          class="shadow-md h-20 w-40 pt-5"
          @click="productStore.viewProducts(category)"
          :class="[
            'shadow-md h-20 w-40 pt-5',
            category === selectedCategory ? ' btn-active' : '',
          ]"
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
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
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
const isActive = ref(false);

//funksjoner
watch(
  () => productStore.selectedCategory,
  async (newValue) => {
    categories.value = await productStore.getCategories();
    selectedCategory.value = newValue;
  },
  { immediate: true }
);

onMounted(() => {
  selectedCategory.value = "";
});
//const isTriggered = computed(() => triggerStore.state.triggered);

// functions
</script>
