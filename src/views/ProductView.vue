<template>
  <div class="container mx-auto px-4">
    <!-- categories -->
    <section class="flex space-x-2">
      <div class="cursor-pointer" @click="changeCategory('products')">
        <p class="font-bold text-xl pb-5">Products</p>
      </div>
      <!-- navigation -->
      <div v-if="selectedCategory" class="flex space-x-2">
        <div><p>/</p></div>
        <div>
          <p class="font-bold text-xl">
            {{ selectedCategory }}
          </p>
        </div>
      </div>
    </section>
    <!-- if user has seleceted category -->
    <section class="flex justify-center pb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center w-full">
        <button
          v-for="category in productStore.allCategories"
          class="w-full btn rounded-none h-20"
          @click="changeCategory(category)"
          :class="
            category == productStore.selectedCategory
              ? 'btn-primary'
              : 'btn-secondary'
          "
        >
          {{ category }}
        </button>
      </div>
    </section>
    <!-- products -->
    <section>
      <Product />
    </section>
    <!-- pagnation -->
    <section class="flex justify-center pt-4">
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
          :class="item === currentPage ? 'btn-secondary' : ''"
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
import { ref, computed, onUnmounted } from "vue";
import Product from "@/components/Product.vue";

// store
const productStore = useProductStore();

//refs
const selectedCategory = ref();
const currentPage = ref(1); // added

//functions
const setLimitBasedOnScreenSize = () => {
  const width = window.innerWidth;

  if (width <= 768) {
    return 5; // Mobile screens
  } else if (width <= 1024) {
    return 8; // Medium screens
  } else {
    return 12; // Large screens
  }
};

//refs2
const limit = ref(setLimitBasedOnScreenSize());

productStore.viewProducts(
  "products",
  Number(currentPage.value),
  Number(limit.value)
);

productStore.getCategories();

// total pages calculated from total products divided by limit
const totalPages = computed(() => {
  return Math.ceil(productStore.totalProducts?.length / limit.value);
});

// Function to set the limit based on screen size
const updateLimit = () => {
  limit.value = setLimitBasedOnScreenSize();
};

// Event listener for window resize
window.addEventListener("resize", updateLimit);

// Cleanup event listener on component unmount
onUnmounted(() => {
  window.removeEventListener("resize", updateLimit);
  productStore.selectedCategory = "";
});

// goto button
const goToPage = (page) => {
  if (page !== "...") {
    currentPage.value = page;
    productStore.viewProducts(
      selectedCategory.value || "products",
      currentPage.value,
      limit.value
    );
  }
};
//items in pagnation
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
//prev button
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    productStore.viewProducts(
      selectedCategory.value || "products",
      currentPage.value,
      limit.value
    );
  }
};
//nextpage button
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    productStore.viewProducts(
      selectedCategory.value || "products",
      currentPage.value,
      limit.value
    );
  }
};
//button for changing category
const changeCategory = (category) => {
  selectedCategory.value = category === "products" ? undefined : category; // Set the local ref
  productStore.selectedCategory = category === "products" ? "" : category; // Set the value in the store
  currentPage.value = 1; // Reset to the first page
  productStore.viewProducts(category, currentPage.value, limit.value);
};
//end
</script>
