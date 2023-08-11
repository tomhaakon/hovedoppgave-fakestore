<template>
  <div>
    <div class="p-5 text-xl font-bold">
      <p>Check out newest items</p>
    </div>
    <div v-for="product in products" class="px-5 pb-16">
      <div class="card bg-base-200 shadow-md rounded-none">
        <div class="h-full w-full">
          <img
            :alt="product.category"
            :src="product.image"
            class="rounded-none h-full w-full"
          />
        </div>

        <div class="py-3">
          <p class="">{{ product.title }}</p>

          <p class="text-red-700 text-xl font-bold pt-5">
            {{ product.price * 10 }} kr
          </p>

          <p class="text-sm">Fri frakt</p>
        </div>
        <div>
          <button
            class="btn-primary drop-shadow-md absolute right-5 bottom-3 h-8 w-20 rounded-lg text-black border-0 font-bold"
            @click="productStore.openDialog(product.id)"
          >
            + Kjøp
          </button>
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
