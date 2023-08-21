<template class="">
  <div v-if="productStore.isLoading" class="flex justify-center">
    <Loader />
  </div>
  <div
    v-if="!productStore.isLoading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <!-- Use productStore.showProducts instead of productStore.totalProducts -->
    <div v-for="product in productStore.showProducts">
      <div class="rounded-none border-2 border-slate-300 px-4">
        <div class="flex justify-center pb-6 p-14">
          <RouterLink
            to="/item"
            class="cursor-pointer"
            @click="productStore.showSingleProduct = product"
          >
            <img
              :alt="product.category"
              :src="product.image"
              class="rounded-none cursor-pointer"
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
            <div class="w-1/2 h-1/2">
              <p class="text-2xl font-bold">
                {{ (product.price * 10).toFixed(2) }},- kr
              </p>
              <p class="text-sm">Free shipping!</p>
            </div>
            <div class="w-1/2 justify-end text-right pt-4 pb-4">
              <p
                v-if="product.id === 1"
                class="text-xs font-bold uppercase pb-1"
              >
                Out of stock
              </p>
              <p
                class="text-xs font-bold uppercase pb-1 mr-3"
                :hidden="product.id === 1"
                v-if="getProductCountInCart(product.id) > 0"
              >
                {{ getProductCountInCart(product.id) }} in cart
              </p>
              <button
                class="btn-primary text-black btn rounded-none border-0 w-20"
                @click="addToCart(product)"
                :disabled="product.id === 1"
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
const productInCart = ref(false);
// refs
const isProductInCart = computed(
  () => (productId) => shoppingCartStore.isProductInCart(productId)
);
const groupedCart = computed(() => shoppingCartStore.groupedCart);
const getProductCountInCart = (productId) => {
  const item = groupedCart.value.find((product) => product.id === productId);
  return item ? item.count : 0;
};

// functions
const addToCart = (product) => shoppingCartStore.addToCart(product);
</script>
