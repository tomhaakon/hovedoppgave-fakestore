<template>
  <div class="container mx-auto px-4">
    <div v-if="productStore.searching">
      <div v-if="filteredItems.length > 0">
        <div class="font-bold">
          Found {{ filteredItems.length }} items containing the word "{{
            productStore.searching
          }}"
        </div>
        <div v-for="item in filteredItems" :key="item.id" class="pb-4">
          <div class="w-full flex border-2 p-4">
            <div class="w-1/2 h-20 flex justify-center">
              <img :src="item.image" class="object-fit pb-4 px-4" />
            </div>
            <div class="w-full" v-html="highlightSearchTerm(item.title)"></div>
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

const productStore = useProductStore();
const searching = productStore.searching;

const filteredItems = computed(() => {
  return productStore.searchResult.filter((item) =>
    item.title.toLowerCase().includes(productStore.searching.toLowerCase())
  );
});

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
