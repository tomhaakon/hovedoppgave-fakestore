<template class="">
  <div v-for="product in products" class="mb-10">
    <div class="w-full card rounded-none shadow-lg">
      <div class="w-full flex justify-center">
        <img
          :alt="product.category"
          :src="product.image"
          class="rounded-none h-80 cursor-pointer"
          @click="productStore.openDialog(product)"
        />
      </div>
      <div class="p-3">
        <div class="cursor-pointer" @click="productStore.openDialog(product)">
          <p class="">
            {{ product.title }}
          </p>
        </div>
        <div>
          <p class="text-red-700 text-2xl font-bold py-2">
            {{ product.price * 10 }},- kr
          </p>
        </div>
        <p class="text-sm">Fri frakt</p>
      </div>
      <div>
        <button
          class="btn-primary drop-shadow-md absolute right-5 bottom-3 btn rounded-lg border-0"
          @click="productStore.addToCart(product.id)"
        >
          + Kjøp
        </button>
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
