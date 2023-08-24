<template>
  <div
    v-if="store.showPictureWindow"
    class="bg-white h-full w-full fixed z-30"
    @click="store.showPictureWindow = false"
  >
    <div class="w-full flex justify-center mx-auto absolute">
      <img
        :src="store.showSingleProduct.image"
        class="w-full h-full object-contain max-h-[800px] fixed"
      />
    </div>
    <div class="fixed right-0 p-4">
      .
      <span
        class="material-symbols-outlined cursor-pointer"
        @click="store.showPictureWindow = false"
      >
        close
      </span>
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from "../stores/Productstore";

const store = useProductStore();
</script>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  color: #000;
  font-size: xx-large;
}
</style>
