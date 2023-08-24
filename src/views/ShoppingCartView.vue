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
            <div class="w-full px-4 pb-2">
              <RouterLink
                to="/item"
                class="cursor-pointer"
                @click="productStore.showSingleProduct = item"
                >{{ item.title }}</RouterLink
              >
            </div>
            <div class="text-left w-1/4">
              {{ Math.round(item.price * 10 * item.count) }},-
            </div>
          </div>
        </div>

        <div class="text-right pt-5">Total: {{ totalPrice }},-</div>
        <div class="flex w-full pt-5">
          <div class="">
            <ConfirmDialog :title="dialogTitle" :function1="dialogFunction1" />
          </div>
          <div class="ml-auto">
            <button @click="setClearCartDialog" class="btn rounded-none">
              Clear Cart
            </button>
            <button
              class="btn btn-primary rounded-none ml-4"
              @click="setCheckoutDialog"
              v-if="userStore.user"
            >
              Checkout
            </button>
            <button
              class="btn btn-primary rounded-none"
              @click="shoppingCartStore.checkout()"
              v-if="!userStore.user"
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
import { useUserStore } from "../stores/UserStore";
import { useProductStore } from "../stores/Productstore";

import { RouterLink } from "vue-router";

import ConfirmDialog from "@/components/ConfirmationDialog.vue";
const { removeFromCart, clearCart, checkout } = useShoppingCartStore();
const userStore = useUserStore();
const productStore = useProductStore();
const { toggleDialog } = useNotificationStore();
const shoppingCartStore = useShoppingCartStore();
const canAddToCart = ref(true);

const groupedCart = computed(() => shoppingCartStore.groupedCart);
const totalPrice = computed(() => shoppingCartStore.totalPrice);

const dialogTitle = ref("");
const dialogFunction1 = ref(null);

const setClearCartDialog = () => {
  toggleDialog();
  dialogTitle.value = "Are you sure you want to clear the cart of all items?";
  dialogFunction1.value = clearCart;
};
const setCheckoutDialog = () => {
  toggleDialog();

  dialogTitle.value = "Are you sure you want to proceed with the checkout?";
  dialogFunction1.value = checkout;
};
const addToCart = (product) => {
  if (canAddToCart.value) {
    // Notify user immediately
    const msg = "Added " + product.title + " to cart";
    useNotificationStore().addNotification(msg, "success");

    // Add to cart immediately
    shoppingCartStore.addToCart(product);

    // Disable adding to cart for the next 1000ms
    canAddToCart.value = false;
    setTimeout(() => {
      canAddToCart.value = true;
    }, 500);
  }
};
</script>
