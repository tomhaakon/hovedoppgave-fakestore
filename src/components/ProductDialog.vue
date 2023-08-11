<template>
  <section v-if="isOpen" class="bg-base-100 w-full px-2">
    <div class="flex justify-end">
      <span class="text-2xl cursor-pointer" @click="productStore.closeDialog()">
        x
      </span>
    </div>
    <div class="w-full pb-5">
      <div>
        <p class="pb-2">{{ productStore.showProduct.category }}</p>
      </div>
      <div>
        <p class="font-bold text-xl">{{ productStore.showProduct.title }}</p>
      </div>
      <div class="py-5">
        <div class="w-full flex justify-center">
          <a :href="productStore.showProduct.image" target="_blank">
            <img
              :src="productStore.showProduct.image"
              :alt="productStore.showProduct.title"
              class="h-36"
          /></a>
        </div>
        <div class="w-full flex justify-center">
          <p class="text-sm">(click for large image)</p>
        </div>
      </div>
      <div class="pb-5">
        <p>{{ productStore.showProduct.description }}</p>
      </div>
    </div>

    <div class="w-full pb-10 flex justify-evenly">
      <div class="">
        <p class="text-4xl">{{ productStore.showProduct.price }},- Kr</p>
        <p>fri frakt</p>
      </div>
      <div class="space-x-1">
        <button @click="productStore.closeDialog()" class="btn btn-secondary">
          Avbryt
        </button>
        <button @click="productStore.closeDialog()" class="btn btn-primary">
          Kjøp
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/Productstore";

const productStore = useProductStore();
const isOpen = computed(() => productStore.showDialog);
console.log("productdialog: productstore.showDialog=", isOpen);
</script>
