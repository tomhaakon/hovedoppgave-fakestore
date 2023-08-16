<template>
  <div class="w-full">
    <section v-if="showCategories" class="flex justify-center pt-5">
      <div class="columns-2 text-center space-y-5">
        <div
          v-for="category in categories"
          class="shadow-md h-20 w-40 pt-5"
          @click="changeCategory(category)"
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
import { watch, ref, onMounted, computed } from "vue";
import Product from "@/components/Product.vue";

// store
const productStore = useProductStore();
// variables
const categories = ref();
const selectedCategory = ref();

const showCategories = ref(true);
const currentPage = ref(1); // added
const limit = 5; // items per page

// total pages calculated from total products divided by limit
const totalPages = computed(() => {
  return Math.ceil(productStore.totalProducts?.length / limit);
});

console.log("totalPages: ", totalPages);
// Call viewProducts with current page and limit
productStore.viewProducts("products", currentPage.value, limit);
productStore.getCategories();

// watchers
watch(
  () => productStore.selectedCategory,
  async (newValue) => {
    categories.value = await productStore.getCategories();
    selectedCategory.value = newValue;
  },
  { immediate: true }
);

// lifecycle hooks
onMounted(() => {
  selectedCategory.value = "";
});

// pagination functions
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    productStore.viewProducts(
      selectedCategory.value || "products",
      currentPage.value,
      limit
    );
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    productStore.viewProducts(
      selectedCategory.value || "products",
      currentPage.value,
      limit
    );
  }
};
const changeCategory = (category) => {
  currentPage.value = 1; // Reset to the first page
  productStore.viewProducts(category, currentPage.value, limit);
};
</script>
