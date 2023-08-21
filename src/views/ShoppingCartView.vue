<template>
  <div class="container mx-auto px-4">
    <ConfirmDialog
      title="Are you sure you want to clear the cart of all items? "
      :function1="() => clearCart()"
      :function2="() => notifictionStore.toggleDialog()"
    />

    <div class="">
      <div class="flex h-10 w-full">
        <p class="font-bold text-xl">Shopping cart</p>
      </div>
      <div class="pt-5" v-if="totalPrice > 0">
        <!-- sd -->
        <div class="">
          <div class="flex pb-5">
            <div class="flex w-2/4 font-bold text-sm">
              <p class="text-center w-full">Quantity</p>
            </div>
            <div class="w-full px-4">
              <p class="font-bold text-sm">Title</p>
            </div>
            <div class="w-1/4">
              <p class="font-bold text-sm">Price</p>
            </div>
            <div class=""></div>
          </div>
          <div
            v-for="item in groupedCart"
            :key="item.id"
            v-if="groupedCart"
            class="flex border"
          >
            <div class="w-2/4 flex join p-1.5">
              <button
                class="btn btn-sm btn-secondary rounded-none"
                @click="removeFromCart(item.id)"
              >
                -
              </button>
              <button class="btn-ghost btn-sm btn rounded-none">
                {{ item.count }}
              </button>
              <button
                class="btn btn-sm btn-secondary rounded-none"
                @click="addToCart(item)"
              >
                +
              </button>
            </div>
            <div class="w-full px-4">{{ item.title }}</div>
            <div class="text-left w-1/4">
              {{ Math.round(item.price * 10 * item.count) }},-
            </div>
          </div>
        </div>

        <div class="text-right pt-5">Total: {{ totalPrice }},-</div>
        <div class="flex w-full pt-5">
          <div class="w-1/2 text-left">
            <button
              @click="notifictionStore.toggleDialog()"
              class="btn btn-neutral btn-sm rounded-none"
            >
              Clear Cart
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
import { useNotificationStore } from "../stores/NotificationStore";

import ConfirmDialog from "@/components/ConfirmationDialog.vue";
const { removeFromCart, addToCart, clearCart } = useShoppingCartStore();
const notifictionStore = useNotificationStore();

const shoppingCartStore = useShoppingCartStore();

const groupedCart = computed(() => shoppingCartStore.groupedCart);
const totalPrice = computed(() => shoppingCartStore.totalPrice);
</script>
