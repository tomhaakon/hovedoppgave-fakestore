<template>
  <div class="bg-red-500">
    <div class="flex h-10">
      <div class="w-1/4"></div>
      <div class="bg-green-500 w-2/4">
        <p class="text-center font-bold text-xl p-1">Shopping cart</p>
      </div>
      <div class="w-1/4"></div>
    </div>
    <div class="">
      <div class="flex">
        <div class="w-10 flex justify-center">x</div>
        <div class="w-5/8">title</div>
        <div class="w-1/8"></div>
        <div class="w-30"></div>
      </div>
      <div
        v-for="item in cart"
        :key="item.id"
        v-if="cart"
        class="bg-purple-500 flex"
      >
        <div class="w-10 flex justify-center">x</div>
        <div class="bg-orange-500 w-full">{{ item.title }}</div>
        <div></div>
        <div class="w-1/8">
          <button class="w-1/8" @click="removeFromCart(item.id)">remove</button>
        </div>
      </div>
    </div>
    <div class="bg-blue-500 flex w-full pt-5">
      <div class="w-full">
        <button class="" @click="clearCart">
          <p class="pl-10">Clear Cart</p>
        </button>
      </div>
      <div class="flex justify-end pr-10">
        <button class="btn btn-primary">To payment</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useShoppingCartStore } from "@/stores/Shoppingcartstore.js";

const shoppingCartStore = useShoppingCartStore();
const cart = computed(() => shoppingCartStore.cart);
const products = ref([{ id: 1, title: "Product 1" }]);

const addToCart = (product) => shoppingCartStore.addToCart(product);
const removeFromCart = (product) => shoppingCartStore.removeFromCart(product);
const clearCart = () => {
  shoppingCartStore.clearCart();
};
</script>
