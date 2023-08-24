<template>
  <div class="my-auto w-full sm:py-5">
    <div class="search-container my-auto w-full text-right">
      <input
        v-model="searchVar"
        @focus="productStore.searchWindow = true"
        maxlength="15"
        type="text"
        placeholder="Search for item"
        class="input input-bordered sm:max-w-xs w-3/4 input-sm rounded-none search-input "
      />
      <span
        class="material-symbols-outlined search-icon"
        @click="openSearchWindow"
      >
        search
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "@/stores/Productstore";

const productStore = useProductStore();
const searchVar = ref("");
productStore.searching = searchVar;
productStore.searchProducts();

if (searchVar.value) {
  productStore.searchWindow = true;
}
const openSearchWindow = () => {
  productStore.searchWindow = true;
};
//console.log("searchVar.value", searchVar.value);

console.log("SearchBar.vue: searchVar.value: ", searchVar.value);
const searchButton = () => {};
</script>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 1000, "GRAD" 0, "opsz";
}
.search-container {
  position: relative;
}

.search-input {
  padding-right: 30px; /* Space for the search icon */
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: grey;
  /* Add more styling as needed */
}
</style>
