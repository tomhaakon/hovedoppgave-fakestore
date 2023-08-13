<template>
  <div v-for="item in cart" :key="item.id" v-if="cart">
    {{ item.title }}
    <button class="btn btn-primary" @click="removeFromCart(item.id)">
      remove
    </button>
  </div>
  <div v-for="product in products">
    {{ product }}
    <button class="btn btn-primary" @click="addToCart(product)">
      Add to cart
    </button>
  </div>
  <button class="btn btn-primary" @click="clearCart">Clear Cart</button>
</template>

<script setup>
import { computed, ref } from "vue";
import { useShoppingCartStore } from "@/stores/Shoppingcartstore.js";

const shoppingCartStore = useShoppingCartStore();
const cart = computed(() => shoppingCartStore.cart);
const products = ref([{ id: 1, title: "Product 1" }]);

const addToCart = (product) => shoppingCartStore.addToCart(product);
const removeFromCart = (product) => shoppingCartStore.removeFromCart(product);
const clearCart = () => {
  shoppingCartStore.clearCart();
};
</script>
