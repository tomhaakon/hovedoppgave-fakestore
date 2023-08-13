<template>
  <section
    v-if="isOpen"
    class="bg-white w-full px-2 top-10 fixed shadow-xl z-50"
  >
    <div class="flex pt-3">
      <div class="w-5/6 pb-2">
        <p>
          <RouterLink to="/product" @click="productStore.closeDialog()"
            >Products</RouterLink
          >
          >
          <RouterLink to="/product">{{
            productStore.showSingleProduct.category
          }}</RouterLink>
        </p>
      </div>
      <div class="w-1/6 flex justify-end pr-5">
        <span
          class="text-2xl cursor-pointer"
          @click="productStore.closeDialog()"
        >
          x
        </span>
      </div>
    </div>
    <div class="w-full pb-5">
      <div>
        <p class="font-bold text-xl pb-5">
          {{ productStore.showSingleProduct.title }}
        </p>
      </div>
      <div class="pb-5">
        <p class="text-sm">{{ productStore.showSingleProduct.description }}</p>
      </div>
      <div class="flex w-full justify-center">
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
                <p class="text-2xl text-red-700 font-bold pt-5">
                  {{ Math.round(productStore.showSingleProduct.price * 10) }},-
                  Kr
                </p>
              </div>
              <div class="h-1/3"><p>fri frakt!</p></div>
            </div>
            <div class="">
              <button
                @click="
                  shoppingCartStore.addToCart(productStore.showSingleProduct) &
                    productStore.closeDialog()
                "
                class="btn btn-primary w-full rounded-none"
              >
                Kjøp
              </button>

              <button
                @click="productStore.closeDialog()"
                class="btn btn-sm w-full rounded-none"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      </div>
      <div><p class="italic pt-5">(click on image to enlarge)</p></div>
    </div>

    <div class="w-full pb-5"></div>
  </section>
</template>
<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/Productstore";
import { useShoppingCartStore } from "../stores/Shoppingcartstore";

const productStore = useProductStore();
const shoppingCartStore = useShoppingCartStore();
const isOpen = computed(() => productStore.showDialog);
//console.log("productdialog: productstore.showDialog=", isOpen);
</script>
