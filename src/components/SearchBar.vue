<template>
  <div class="my-auto w-full sm:py-5">
    <div class="search-container my-auto w-full text-right">
      <input
        v-model="searchVar"
        @focus="productStore.searchWindow = true"
        maxlength="15"
        type="text"
        placeholder="Search for item"
        class="input input-bordered sm:max-w-xs w-3/4 input-sm rounded-none search-input"
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
//import
import { ref } from "vue";
import { useProductStore } from "@/stores/Productstore";

//stores
const productStore = useProductStore();

//refs
const searchVar = ref("");

//trigger searchProducts 
productStore.searchProducts();

//functions
if (searchVar.value) {
  productStore.searchWindow = true;
}
const openSearchWindow = () => {
  productStore.searchWindow = true;
};
//end
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
