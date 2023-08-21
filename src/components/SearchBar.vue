<template>
  <div class="my-auto w-full">
    <input
      v-model="searchVar"
      maxlength="15"
      type="text"
      placeholder="Search for item"
      class="input input-bordered max-w-xs w-full input-sm rounded-none join-item"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/Productstore";

const productStore = useProductStore();
const searchVar = ref("");
productStore.searching = searchVar;
productStore.searchProducts();

const searchButton = () => {
  console.log(searchVar.value);
};
</script>
