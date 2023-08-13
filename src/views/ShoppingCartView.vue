<template>
  <div class="mx-10">
    <div class="flex h-10">
      <div class="w-1/4"></div>
      <div class="w-2/4">
        <p class="text-center font-bold text-xl p-1">Shopping cart</p>
      </div>
      <div class="w-1/4"></div>
    </div>
    <!-- sd -->
    <div class="">
      <div class="flex pb-2">
        <div class="w-5 flex justify-center"></div>
        <div class="w-full px-5"><p class="font-bold text-sm">Title</p></div>
        <div class="w-40 text-left">
          <p class="font-bold text-sm">Price</p>
        </div>
        <div class="w-5"></div>
      </div>
      <div
        v-for="item in groupedCart"
        :key="item.id"
        v-if="groupedCart"
        class="flex shadow-md"
      >
        <div class="w-5 flex justify-center">{{ item.count }}x</div>
        <div class="w-full px-5">{{ item.title }}</div>
        <div class="w-40 text-left">
          {{ Math.round(item.price * 10 * item.count) }}
        </div>
        <div class="w-5 text-right">
          <button class="" @click="removeFromCart(item.id)">x</button>
        </div>
      </div>
    </div>
    <div class="flex w-full pt-5">
      <div class="w-full">
        <button class="" @click="clearCart">
          <p class="">Clear Cart</p>
        </button>
      </div>
      <div class="flex justify-end">
        <button class="btn btn-primary mt-5">To payment</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useShoppingCartStore } from "@/stores/Shoppingcartstore.js";

const shoppingCartStore = useShoppingCartStore();
const cart = computed(() => shoppingCartStore.cart);
// count same items
const groupedCart = computed(() => {
  const counts = {};
  cart.value.forEach((item) => {
    counts[item.id] = (counts[item.id] || 0) + 1;
  });
  return Object.keys(counts).map((id) => {
    const item = cart.value.find((item) => item.id == id);
    return {
      id: +id,
      title: item.title,
      price: item.price, // Add the price here
      count: counts[id],
    };
  });
});

// consts
const removeFromCart = (id) => shoppingCartStore.removeFromCart(id);
const clearCart = () => {
  shoppingCartStore.clearCart();
};
</script>
