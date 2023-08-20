<template>
  <section v-if="productStore.showSingleProduct" class="mx-auto px-4">
    <div class="flex pt-3">
      <div class="w-5/6 pb-2">
        <p>
          <RouterLink to="/product"></RouterLink>
          Products /
          <RouterLink to="/product">{{
            productStore.showSingleProduct.category
          }}</RouterLink>
        </p>
      </div>
    </div>
    <div class="w-full pb-5">
      <div>
        <p class="font-bold text-xl pb-5">
          {{ productStore.showSingleProduct.title }}
        </p>
      </div>

      <div class="w-full justify-center">
        <div class=" ">
          <a :href="productStore.showSingleProduct.image" target="_blank">
            <img
              :src="productStore.showSingleProduct.image"
              :alt="productStore.showSingleProduct.title"
              class="p-5"
          /></a>

          <div class="py-5">
            <p class="text-sm">
              {{ productStore.showSingleProduct.description }}
            </p>
          </div>
          <div class="w-full flex justify-end">
            <p class="text-3xl font-bold">
              {{ (productStore.showSingleProduct.price * 10).toFixed(2) }},- kr
            </p>
          </div>

          <div class="py-5">
            <button
              @click="
                shoppingCartStore.addToCart(productStore.showSingleProduct)
              "
              class="btn btn-primary w-full rounded-none"
            >
              Buy
            </button>
          </div>
        </div>
        <div class="w-full"></div>
      </div>

      <div class=""></div>

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
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/Productstore";
import { useShoppingCartStore } from "../stores/Shoppingcartstore";

const productStore = useProductStore();
const shoppingCartStore = useShoppingCartStore();
</script>
