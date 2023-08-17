<template class="">
  <div v-if="loading" class="text-9xl">Loading</div>
  <div v-else>
    <div v-for="product in products" class="">
      <div class="w-full rounded-none shadow-lg">
        <div class="w-full flex justify-center">
          <img
            :alt="product.category"
            :src="product.image"
            class="rounded-none h-80 cursor-pointer mt-10"
            @click="productStore.openDialog(product)"
          />
        </div>
        <div class="p-5">
          <div class="cursor-pointer" @click="productStore.openDialog(product)">
            <p class="py-3">
              {{ product.title }}
            </p>
          </div>
          <div class="flex pb-5">
            <div class="w-3/5">
              <p class="text-red-700 text-2xl font-bold py-2">
                {{ Math.round(product.price * 10) }},- kr
              </p>
              <p class="text-sm">Free shipping!</p>
            </div>
            <div class="w-2/5 justify-end flex">
              <button
                class="btn-primary drop-shadow-md bottom-3 btn rounded-none border-0"
                @click="addToCart(product)"
              >
                + Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from "@/stores/Productstore.js";
import { useShoppingCartStore } from "../stores/Shoppingcartstore";
import { ref, watch, onMounted, computed } from "vue";

// store
const productStore = useProductStore();
const shoppingCartStore = useShoppingCartStore();
// refs
const products = ref();
const loading = ref(false);

// functions
const addToCart = (product) => shoppingCartStore.addToCart(product);
watch(
  () => productStore.showProducts,
  (newValue) => {
    loading.value = true;
    products.value = newValue;
    loading.value = false;
  },
  { immediate: true }
);
</script>
