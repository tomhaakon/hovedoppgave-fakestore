<template class="">
  <!-- if loading -->
  <div v-if="productStore.isLoading" class="flex justify-center">
    <Loader />
  </div>
  <!-- if not loading -->
  <div
    v-if="!productStore.isLoading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <!--products   -->
    <div v-for="product in productStore.showProducts" class="">
      <div
        class="rounded-none border-2 border-slate-300 p-4 lg:p-0 h-full md:h-[480px]"
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
        <div class="space-y-4 lg:px-4">
       <!-- view single product link -->
          <RouterLink
            to="/item"
            class="cursor-pointer line-clamp-1"
            @click="productStore.showSingleProduct = product"
          >
            {{ product.title }}
          </RouterLink>
          <div class="flex">
            <!-- price -->
            <div class="w-2/3 lg:w-full">
              <p class="text-2xl font-bold lg:text-sm">
                {{ (product.price * 10).toFixed(2) }},- kr
              </p>
              <p class="text-sm">Free shipping!</p>
            </div>
            <!-- add to cart button --> 
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
              <!-- products in cart --> 
              <p
                class="text-xs font-bold uppercase pt-2 text-center"
                :hidden="product.id === 1"
                v-if="getProductCountInCart(product.id) > 0"
              >
                {{ getProductCountInCart(product.id) }} in cart
              </p>
              <!-- added out of stock for training purpose -->
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
//imports
import { useProductStore } from "@/stores/Productstore.js";
import { useShoppingCartStore } from "../stores/Shoppingcartstore";
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useNotificationStore } from "@/stores/NotificationStore.js";
import Loader from "@/components/Loader.vue";

// store
const productStore = useProductStore();
const shoppingCartStore = useShoppingCartStore();

// refs
const canAddToCart = ref(true);

// functions
const groupedCart = computed(() => shoppingCartStore.groupedCart);

// count products in cart
const getProductCountInCart = (productId) => {
  const item = groupedCart.value.find((product) => product.id === productId);
  return item ? item.count : 0;
};
// add to cart
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
    }, 1000);
  }
};
//end
</script>
