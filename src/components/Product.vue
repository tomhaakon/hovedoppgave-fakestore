<template class="">
  <div v-if="productStore.isLoading" class="flex justify-center">
    <Loader />
  </div>
  <div
    v-if="!productStore.isLoading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <!-- Use productStore.showProducts instead of productStore.totalProducts -->
    <div v-for="product in productStore.showProducts" class="">
      <div
        class="rounded-none border-2 border-slate-300 p-4 h-full md:h-[480px]"
      >
        <div
          class="flex justify-center w-full mx-auto md:w-full md:h-[300px] p-10 md:p-4"
        >
          <RouterLink
            to="/item"
            class="cursor-pointer"
            @click="productStore.showSingleProduct = product"
          >
            <img
              :alt="product.category"
              :src="product.image"
              class="rounded-none cursor-pointer md:h-full h-11/12 mx-auto object-contain"
              @click="productStore.showSingleProduct = product"
            />
          </RouterLink>
        </div>
        <div class="space-y-4">
          <RouterLink
            to="/item"
            class="cursor-pointer line-clamp-1"
            @click="productStore.showSingleProduct = product"
          >
            {{ product.title }}
          </RouterLink>
          <div class="flex">
            <div class="w-2/3 lg:w-full">
              <p class="text-2xl font-bold lg:text-lg">
                {{ (product.price * 10).toFixed(2) }},- kr
              </p>
              <p class="text-sm">Free shipping!</p>
            </div>
            <div class="w-1/3 justify-end text-right lg:w-full">
              <button
                class="btn-primary text-black btn rounded-none border-0 w-full"
                @click="addToCart(product)"
                :disabled="product.id === 1"
                :class="
                  getProductCountInCart(product.id)
                    ? 'btn-secondary'
                    : 'btn-primary'
                "
              >
                Buy
              </button>
              <p
                class="text-xs font-bold uppercase pt-2 text-center"
                :hidden="product.id === 1"
                v-if="getProductCountInCart(product.id) > 0"
              >
                {{ getProductCountInCart(product.id) }} in cart
              </p>
              <p
                v-if="product.id === 1"
                class="text-xs font-bold uppercase pt-2 text-center"
              >
                Out of stock
              </p>
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
