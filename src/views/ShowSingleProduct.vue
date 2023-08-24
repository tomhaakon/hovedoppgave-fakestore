<template>
  <section v-if="productStore.showSingleProduct" class="mx-auto px-4">
    <div class="md:py-10 max-w-[800px] flex-row mx-auto">
      <div>
        <p class="font-bold text-xl">
          {{ productStore.showSingleProduct.title }}
        </p>
      </div>
      <div class="w-5/6 py-2">
        <p class="md:text-xl">
          <button @click="goToProducts()">Products</button> /

          <button
            @click="changeCategory(productStore.showSingleProduct.category)"
          >
            {{ productStore.showSingleProduct.category }}
          </button>
        </p>
      </div>
    </div>
    <div class="w-full">
      <div class="w-full">
        <div class="mx-auto border-4 flex justify-center max-w-[800px]">
          <img
            :src="productStore.showSingleProduct.image"
            :alt="productStore.showSingleProduct.title"
            class="p-10 max-h-[600px]"
            @click="productStore.showBigPicture()"
          />
        </div>

        <div class="py-5 max-w-[800px] flex mx-auto">
          <p class="md:text-xl">
            {{ productStore.showSingleProduct.description }}
          </p>
        </div>
        <div class="py-5 max-w-[800px] flex mx-auto justify-end">
          <p class="text-3xl font-bold">
            {{ (productStore.showSingleProduct.price * 10).toFixed(2) }},- kr
          </p>
        </div>

        <div class="py-5 flex-row text-right mx-auto justify-end max-w-[800px]">
          <p
            v-if="productStore.showSingleProduct.id === 1"
            class="font-bold py-2 text-xl"
          >
            out of stock
          </p>

          <button
            class="btn-primary text-black btn rounded-none border-0 w-full"
            @click="addToCart(productStore.showSingleProduct)"
            :disabled="productStore.showSingleProduct.id === 1"
          >
            Buy
          </button>
          <p
            v-if="isProductInCart(productStore.showSingleProduct.id)"
            class="py-2"
          >
            (You have
            <span class="font-bold">{{
              getProductCountInCart(productStore.showSingleProduct.id)
            }}</span>
            of this item in cart)
          </p>
        </div>
      </div>

      <div class="flex w-full justify-center pt-10">
        <div class="flex justify-center w-1/2"></div>

        <div class="w-1/2">
          <div class="h-full space-y-4">
            <div class="pl-5"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full pb-5"></div>
  </section>
</template>
<script setup>
//import
import { useRouter } from "vue-router";
import { useProductStore } from "../stores/Productstore";
import { useShoppingCartStore } from "../stores/Shoppingcartstore";
import { useNotificationStore } from "../stores/NotificationStore";

//import router from "../router";

import { computed, ref } from "vue";

//stores
const productStore = useProductStore();
const shoppingCartStore = useShoppingCartStore();
const canAddToCart = ref(true);

//const
const router = useRouter();

const changeCategory = () => {
  productStore.selectedCategory = productStore.showSingleProduct.category;
  productStore.viewProducts(productStore.showSingleProduct.category);
  router.push("/product");
};
const goToProducts = () => {
  router.push("/product");
};
const isProductInCart = computed(
  () => (productId) => shoppingCartStore.isProductInCart(productId)
);
const groupedCart = computed(() => shoppingCartStore.groupedCart);
const getProductCountInCart = (productId) => {
  const item = groupedCart.value.find((product) => product.id === productId);
  return item ? item.count : 0;
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
    }, 1000);
  }
};
</script>
