<template>
  <div class="container mx-auto px-4">
    <div class="">
      <div class="flex h-10 w-full">
        <p class="font-bold text-xl">Shopping cart</p>
      </div>
      <div class="pt-5" v-if="totalPrice > 0">
        <!-- sd -->
        <div class="">
          <div class="flex pb-5">
            <div class="w-14 flex"></div>
            <div class="w-full">
              <p class="font-bold text-sm">Title</p>
            </div>
            <div class="w-28">
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
            <div class="w-14 flex">{{ item.count }}x</div>
            <div class="w-full">{{ item.title }}</div>
            <div class="w-28 text-left">
              {{ Math.round(item.price * 10 * item.count) }},-
            </div>
            <div class="w-10">
              <button class="" @click="removeFromCart(item.id)">x</button>
            </div>
          </div>
        </div>

        <div class="text-right pt-5">Total: {{ totalPrice }},-</div>
        <div class="flex w-full pt-5">
          <div class="w-1/2 text-left">
            <button
              class="btn-neutral btn rounded-none btn-sm"
              @click="clearCart"
              v-if="shoppingCartStore.cartItemCount > 0"
            >
              clear cart
            </button>
          </div>
          <div class="w-1/2 text-right">
            <button
              class="btn btn-primary rounded-none"
              @click="shoppingCartStore.checkout()"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <div v-else class="">Your cart is empty.</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useShoppingCartStore } from "../stores/Shoppingcartstore";
import { useUserStore } from "../stores/UserStore";
const shoppingCartStore = useShoppingCartStore();
//const cart = computed(() => shoppingCartStore.cart);
// count same items
const groupedCart = computed(() => shoppingCartStore.groupedCart);
const totalPrice = computed(() => shoppingCartStore.totalPrice);

// consts
const removeFromCart = (id) => shoppingCartStore.removeFromCart(id);
const clearCart = () => {
  shoppingCartStore.clearCart();
};
console.log(groupedCart.value);
</script>
