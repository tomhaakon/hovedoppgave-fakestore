<template>
  <div class="container mx-auto my-auto join px-4">
    <input
      v-model="searchVar"
      type="text"
      placeholder="Search for item"
      class="input input-bordered max-w-xs w-full input-sm rounded-none join-item"
    /><button
      class="btn btn-secondary btn-sm join-item rounded-none"
      @click="searchButton"
    >
      Search
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/Productstore";

const productStore = useProductStore();
const searchVar = ref("");
productStore.searching = searchVar;

const searchButton = () => {
  console.log(searchVar.value);
};
</script>
