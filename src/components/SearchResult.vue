<template>
  <div class="container mx-auto px-4">
    <div v-if="productStore.searchWindow">
      <div class="flex justify-end">
        <button
          class="btn btn-secondary rounded-none btn-sm"
          @click="closeSearchWindow()"
        >
          close search window
        </button>
      </div>
      <div v-if="filteredItems.length > 0">
        <div class="font-bold py-4">
          Found {{ filteredItems.length }} items containing the word "{{
            productStore.searching
          }}"
        </div>
        <div v-for="item in filteredItems" :key="item.id" class="pb-4">
          <div class="w-full flex border-2 pt-2">
            <div class="w-1/4 flex justify-center h-20">
              <img :src="item.image" class="" />
            </div>
            <div class="w-3/4 space-y-2">
              <div
                class="text-container w-full h-full"
                v-html="highlightSearchTerm(item.title)"
              ></div>
              <div class="flex w-full justify-end">
                <button
                  class="btn-primary btn btn-sm rounded-none"
                  @click="useShoppingCartStore().addToCart(item)"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        No matching result with the word "{{ productStore.searching }}"
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "../stores/Productstore";
import { useShoppingCartStore } from "../stores/Shoppingcartstore";

const productStore = useProductStore();
const searching = productStore.searching;

const filteredItems = computed(() => {
  return productStore.searchResult.filter((item) =>
    item.title.toLowerCase().includes(productStore.searching.toLowerCase())
  );
});
const closeSearchWindow = () => {
  productStore.searchWindow = false;
};

const highlightSearchTerm = (title) => {
  const searchTerm = productStore.searching.toLowerCase();
  const parts = title.split(new RegExp(`(${searchTerm})`, "ig"));
  return parts
    .map((part) => {
      if (part.toLowerCase() === searchTerm) {
        return `<span class="bg-accent">${part}</span>`;
      } else {
        return part;
      }
    })
    .join("");
};
</script>
<style>
/* Add this CSS class to control the text container */
.text-container {
  max-width: 200px; /* Adjust as needed */
  max-height: 50px; /* Adjust as needed */
  overflow: hidden; /* Hide overflowed content */
  display: -webkit-box; /* Enable line clamping */
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /* Add ellipsis for truncated text */
}
</style>
