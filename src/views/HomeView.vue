<template>
  <main class="snap snap-y snap-mandatory">
    <section class="p-5">
      <p class="text-md">Check out our newest items!</p>
    </section>
    <section
      v-for="product in products"
      class="cursor-pointer mb-10 snap-start"
      @click="productStore.openDialog(product.id)"
    >
      <div class="w-full card rounded-none shadow-lg">
        <div class="w-full flex justify-center">
          <img
            :alt="product.category"
            :src="product.image"
            class="rounded-none h-80 bg-green-50"
          />
        </div>

        <div class="p-3">
          <p class="">{{ product.title }}</p>

          <p class="text-red-700 text-xl font-bold pt-5">
            {{ product.price * 10 }} kr
          </p>

          <p class="text-sm">Fri frakt</p>
        </div>
        <div>
          <button
            class="btn-primary drop-shadow-md absolute right-5 bottom-3 h-8 w-20 rounded-lg border-0"
          >
            + Kjøp
          </button>
        </div>
      </div>
    </section>
  </main>
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
