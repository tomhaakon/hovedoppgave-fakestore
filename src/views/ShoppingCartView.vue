<template>
  <div class="">
    <div class="flex h-10">
      <div class="w-1/4"></div>
      <div class="w-2/4">
        <p class="text-center font-bold text-xl p-1">Shopping cart</p>
      </div>
      <div class="w-1/4"></div>
    </div>
    <!-- sd -->
    <div class="">
      <div class="flex">
        <div class="w-10 flex justify-center"></div>
        <div class="w-full px-5">title</div>
        <div class="w-30"></div>
      </div>
      <div
        v-for="item in groupedCart"
        :key="item.id"
        v-if="groupedCart"
        class="flex shadow-md"
      >
        <div class="w-10 flex justify-center">{{ item.count }}x</div>
        <div class="w-full px-5">{{ item.title }}</div>
        <div class="w-30">
          <button class="" @click="removeFromCart(item.id)">remove</button>
        </div>
      </div>
    </div>
    <div class="flex w-full pt-5">
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
// count same items
const groupedCart = computed(() => {
  const counts = {};
  cart.value.forEach((item) => {
    counts[item.id] = (counts[item.id] || 0) + 1;
  });
  return Object.keys(counts).map((id) => ({
    id: +id, // Convert the id back to a number
    title: cart.value.find((item) => item.id == id).title,
    count: counts[id],
  }));
});
// consts
const removeFromCart = (id) => shoppingCartStore.removeFromCart(id);
const clearCart = () => {
  shoppingCartStore.clearCart();
};
</script>
