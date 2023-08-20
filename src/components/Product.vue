<template class="">
  <div v-if="productStore.isLoading" class="flex justify-center">
    <Loader />
  </div>
  <div
    v-if="!productStore.isLoading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <div v-for="product in productStore.totalProducts">
      <div class="rounded-none border-2 border-slate-300 h-[550px] p-10">
        <div class="flex justify-center ">
          <RouterLink
            to="/item"
            class="cursor-pointer"
            @click="productStore.showSingleProduct = product"
          >
            <img
              :alt="product.category"
              :src="product.image"
              class="rounded-none cursor-pointer h-80"
              @click="productStore.showSingleProduct = product"
            />
          </RouterLink>
        </div>
        <div>
          <RouterLink
            to="/item"
            class="cursor-pointer"
            @click="productStore.showSingleProduct = product"
          >
            {{ product.title }}
          </RouterLink>
          <div class="flex">
            <div class="w-3/5">
              <p class="text-2xl font-bold py-2">
                {{ (product.price * 10).toFixed(2) }},- kr
              </p>
              <p class="text-sm">Free shipping!</p>
            </div>
            <div class="w-2/5 justify-end flex pt-3">
              <button
                class="btn-primary text-black drop-shadow-md btn btn-sm rounded-none border-0 w-20"
                @click="addToCart(product)"
              >
                Buy
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
import { RouterLink } from "vue-router";

import Loader from "@/components/Loader.vue";

// store
const productStore = useProductStore();
const shoppingCartStore = useShoppingCartStore();
// refs
const products = ref();
// const loading = ref(false);

// functions
const addToCart = (product) => shoppingCartStore.addToCart(product);
// watch(
//   () => productStore.showProducts,
//   (newValue) => {
//     loading.value = true;
//     products.value = newValue;
//     loading.value = false;
//   },
//   { immediate: true }
// );
</script>
