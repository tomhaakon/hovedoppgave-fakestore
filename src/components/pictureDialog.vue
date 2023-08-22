<template>
  <div
    v-if="store.showPictureWindow"
    class="bg-white h-full w-full fixed z-30"
    @click="store.showPictureWindow = false"
  >
    <div class="w-full flex justify-center mx-auto absolute">
      <img
        :src="store.showSingleProduct.image"
        class="w-full h-full object-contain max-h-[800px]"
      />
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from "../stores/Productstore";

const store = useProductStore();
</script>
