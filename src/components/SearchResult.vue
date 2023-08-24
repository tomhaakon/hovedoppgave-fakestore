<template>
  <div
    class="container mx-auto px-4 md:w-[550px] md:absolute md:right-0 bg-white md:border-4 pb-4"
  >
    <div v-if="productStore.searchWindow">
      <div class="flex justify-end pt-4">
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
          <RouterLink
            to="/item"
            class="cursor-pointer"
            @click="
              (productStore.showSingleProduct = item), closeSearchWindow()
            "
          >
            <div class="w-full flex border-2 py-2">
              <div class="w-1/4 flex justify-center h-20">
                <img :src="item.image" class="" />
              </div>
              <div class="w-3/4 space-y-2">
                <div
                  class="line-clamp-2 w-full h-full"
                  v-html="highlightSearchTerm(item.title)"
                ></div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      <div v-else>
        No matching result with the word "{{ productStore.searching }}"
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/Productstore";
import { RouterLink } from "vue-router";

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
