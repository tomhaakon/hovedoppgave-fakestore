<template>
  <div class="w-full">
    <section v-if="showCategories" class="flex justify-center pt-5">
      <div class="columns-2 text-center space-y-5">
        <div
          v-for="category in categories"
          class="shadow-md h-20 w-40 pt-6"
          @click="changeCategory(category)"
          :class="[
            'shadow-md h-20 w-40 pt-5 cursor-pointer',
            category === selectedCategory ? ' btn-active' : '',
          ]"
        >
          <p class="font-bold text-lg">{{ category }}</p>
        </div>
      </div>
    </section>
    <section>
      <div class="flex p-5">
        <div class="cursor-pointer pr-2" @click="changeCategory('products')">
          All Products
        </div>
        <div v-if="selectedCategory" class="flex space-x-2">
          <div>/</div>
          <div>{{ selectedCategory }}</div>
        </div>
      </div>
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
// variables
const categories = ref();
const selectedCategory = ref();

const showCategories = ref(true);
const currentPage = ref(1); // added
const limit = 5; // items per page
const productList = ref(null);
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
  }
  currentPage.value = 1; // Reset to the first page
  productStore.viewProducts(category, currentPage.value, limit);
};
</script>
