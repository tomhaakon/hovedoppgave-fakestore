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
      <div class="">
        <p class="text-sm">{{ productStore.showSingleProduct.description }}</p>
      </div>

      <div class="flex w-full justify-center pt-10">
        <div class="flex justify-center w-1/2">
          <div class="flex-row">
            <a :href="productStore.showSingleProduct.image" target="_blank">
              <img
                :src="productStore.showSingleProduct.image"
                :alt="productStore.showSingleProduct.title"
                class="h-48"
            /></a>
          </div>
        </div>

        <div class="w-1/2">
          <div class="h-full space-y-4">
            <div class="pl-5">
              <div class="w-full">
                <p class="text-2xl text-red-700 font-bold pt-16">
                  {{ (productStore.showSingleProduct.price * 10).toFixed(2) }},-
                  kr
                </p>
              </div>
              <div class="h-1/3"><p>free shipping!</p></div>
              <div><p class="italic pb-5">(click on image to enlarge)</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-5 space-y-5">
        <button
          @click="
            shoppingCartStore.addToCart(productStore.showSingleProduct) &
              productStore.closeDialog()
          "
          class="btn btn-primary w-full rounded-none"
        >
          Buy
        </button>
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
