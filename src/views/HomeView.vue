<template>
  <main>
    <p>home</p>
    <pre>{{ productStore.allProducts }}</pre>
  </main>
</template>
<script setup>
import { useProductStore } from "@/stores/Productstore";

const productStore = useProductStore();

productStore.getAllProducts();
</script>
