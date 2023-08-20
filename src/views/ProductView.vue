<template>
  <div class="container mx-auto px-4">
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
    <section>
      <div class="flex"></div>
      <div ref="productList" class="product-list">
        <Product></Product>
      </div>
      <div class="pagination flex text-center pt-5" :hidden="totalPages === 1">
        <div class="join w-full justify-center">
          <button
            class="join-item btn"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            «
          </button>
          <button class="join-item btn" :disabled="totalPages === 1">
            {{ currentPage }} / {{ totalPages }}
          </button>
          <button
            class="join-item btn"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            »
          </button>
        </div>
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
onMounted(() => {
  selectedCategory.value = "";
});

// pagination functions
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    if (productList.value) {
      const offset = 500; // Adjust as needed
      const topPosition =
        productList.value.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: topPosition - offset, behavior: "smooth" });
    }
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
    if (productList.value) {
      const offset = 500; // Adjust as needed
      const topPosition =
        productList.value.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: topPosition - offset, behavior: "smooth" });
    }
    currentPage.value -= 1;
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
