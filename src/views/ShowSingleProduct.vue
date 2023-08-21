<template>
  <section v-if="productStore.showSingleProduct" class="mx-auto px-4">
    <div class="">
      <div>
        <p class="font-bold text-xl">
          {{ productStore.showSingleProduct.title }}
        </p>
      </div>
      <div class="w-5/6 pb-2">
        <p>
          <button @click="goToProducts()">Products</button>

          <!-- productStore.showSingleProduct.category" -->
          <button
            @click="changeCategory(productStore.showSingleProduct.category)"
          >
            {{ productStore.showSingleProduct.category }}
          </button>
        </p>
      </div>
    </div>
    <div class="w-full pb-5">
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
            <p
              v-if="productStore.showSingleProduct.id === 1"
              class="text-right font-bold py-2 text-xl"
            >
              out of stock
            </p>
            <button
              @click="
                shoppingCartStore.addToCart(productStore.showSingleProduct)
              "
              class="btn btn-primary w-full rounded-none"
              :disabled="productStore.showSingleProduct.id === 1"
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
import router from "../router";
import { computed } from "vue";
const productStore = useProductStore();
const shoppingCartStore = useShoppingCartStore();

const changeCategory = () => {
  productStore.selectedCategory = productStore.showSingleProduct.category;
  productStore.viewProducts(productStore.showSingleProduct.category);
  console.warn(productStore.showSingleProduct.category);
  router.push("/product");
};
const goToProducts = () => {
  router.push("/product");
};
</script>
