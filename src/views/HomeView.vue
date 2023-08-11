<template>
  <div class="">
    <div class="p-5 text-xl font-bold">
      <p>Check out our 3 newest items!</p>
    </div>
    <div v-for="product in products" class="px-5 pb-5">
      <div class="card w-full bg-base-200 shadow-md">
        <figure class="px-10 pt-10">
          <img
            :alt="product.category"
            :src="product.image"
            class="rounded-xl w-32 bg-blend-multiply"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ product.title }}</h2>
          <p class="pb-3">Price: {{ product.price }}</p>
          <div class="card-actions">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from "@/stores/Productstore.js";
import { ref, onMounted } from "vue";

// store
const productStore = useProductStore();

// refs
const products = ref([]);

// Fetch products when the component is mounted
onMounted(async () => {
  products.value = await productStore.getNewestProducts();
});

console.log("ProductView.vue LOG", products);

// functions
</script>
