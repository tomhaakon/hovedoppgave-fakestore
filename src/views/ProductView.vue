<template>
  <div class="container mx-auto px-4">
    <!-- categories -->
    <section class="flex space-x-2">
      <div class="cursor-pointer" @click="changeCategory('products')">
        <p class="font-bold text-xl pb-5">Products</p>
      </div>
      <div v-if="selectedCategory" class="flex space-x-2">
        <div><p>/</p></div>
        <div>
          <p class="font-bold text-xl">
            {{ selectedCategory }}
          </p>
        </div>
      </div>
    </section>
    <section class="flex justify-center pb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center w-full">
        <button
          v-for="category in productStore.allCategories"
          class="w-full btn rounded-none h-20"
          @click="changeCategory(category)"
          :class="
            category === selectedCategory ? 'btn-primary' : 'btn-secondary'
          "
        >
          {{ category }}
        </button>
      </div>
    </section>
    <!-- products -->

    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {{ console.log(productStore.showProducts) }}

      <Product />
    </section>
    <section class="flex justify-center pb-4">
      <div class="join">
        <button v-if="currentPage > 1" class="join-item btn" @click="prevPage">
          Previous
        </button>
        <button
          v-for="item in paginationItems"
          :key="item"
          class="join-item btn"
          @click="goToPage(item)"
          :disabled="item === '...'"
        >
          {{ item }}
        </button>
        <button
          v-if="currentPage < totalPages"
          class="join-item btn"
          @click="nextPage"
        >
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
import { RouterLink } from "vue-router";

// store
const productStore = useProductStore();

// refs
const selectedCategory = ref();

// variables
const currentPage = ref(1); // added
const limit = 5; // items per page
const productList = ref(null);

productStore.viewProducts("products", currentPage.value, limit);
productStore.getCategories();
productStore.selectedCategory = "";

// total pages calculated from total products divided by limit
const totalPages = computed(() => {
  return Math.ceil(productStore.totalProducts?.length / limit);
});

console.log("totalPages: ", totalPages);
// Call viewProducts with current page and limit

// watchers
watch(
  () => productStore.selectedCategory,
  async (newValue) => {
    await productStore.getCategories();
    selectedCategory.value = newValue;
  },
  { immediate: true }
);

// lifecycle hooks

// pagination functions
const goToPage = (page) => {
  if (page !== "...") {
    currentPage.value = page;
    productStore.viewProducts(
      selectedCategory.value || "products",
      currentPage.value,
      limit
    );
  }
};
const paginationItems = computed(() => {
  const items = [];
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === 2 ||
      i === totalPages.value - 1 ||
      i === totalPages.value ||
      i === currentPage.value
    ) {
      items.push(i);
    } else if (
      i === currentPage.value + 1 &&
      i !== totalPages.value - 1 &&
      i !== totalPages.value
    ) {
      items.push("...");
    }
  }
  return items;
});
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

const changeCategory = (category) => {
  if (category === "products") {
    productStore.selectedCategory = "";
    return;
  }
  currentPage.value = 1; // Reset to the first page
  productStore.viewProducts(category, currentPage.value, limit);
};
</script>
