<template>
  <div class="">
    <div class="">
      <div class="flex h-10 w-full mb-5 px-5">
        <p class="font-bold text-xl p-1">Shopping cart</p>
      </div>
      <!-- sd -->
      <div class="px-5">
        <div class="flex pb-2">
          <div class="w-5 flex justify-center"></div>
          <div class="w-full px-5"><p class="font-bold text-sm">Title</p></div>
          <div class="w-28 text-left">
            <p class="font-bold text-sm">Price</p>
          </div>
          <div class="w-5"></div>
        </div>
        <div
          v-for="item in groupedCart"
          :key="item.id"
          v-if="groupedCart"
          class="flex shadow-sm"
        >
          <div class="w-5 flex justify-center">{{ item.count }}x</div>
          <div class="w-full px-5">{{ item.title }}</div>
          <div class="w-28 text-left">
            {{ Math.round(item.price * 10 * item.count) }},-
          </div>
          <div class="w-10">
            <button class="" @click="removeFromCart(item.id)">x</button>
          </div>
        </div>
      </div>
      <div class="px-5 pt-3">
        <div class="">
          <button
            class=""
            @click="clearCart"
            v-if="shoppingCartStore.cartItemCount > 0"
          >
            <p class="text-gray-500">clear cart</p>
          </button>
        </div>
        <div class="w-80 text-right">Total: {{ totalPrice }},-</div>
      </div>
      <div class="flex w-full">
        <div class="w-full"></div>
        <div class="flex justify-end px-5">
          <button
            class="btn btn-primary mt-5"
            @click="useShoppingCartStore().checkout()"
          >
            To payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useShoppingCartStore } from "@/stores/Shoppingcartstore.js";
import { useUserStore } from "../stores/UserStore";
const shoppingCartStore = useShoppingCartStore();
const cart = computed(() => shoppingCartStore.cart);
// count same items
const groupedCart = computed(() => shoppingCartStore.groupedCart);
const totalPrice = computed(() => shoppingCartStore.totalPrice);

// consts
const removeFromCart = (id) => shoppingCartStore.removeFromCart(id);
const clearCart = () => {
  shoppingCartStore.clearCart();
};
</script>
