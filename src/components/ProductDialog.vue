<template>
  <div v-if="isOpen" class="">
    Dialog fra helvette
    <button @click="productStore.closeDialog()" class="btn btn-primary">
      close
    </button>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/Productstore";

const productStore = useProductStore();
const isOpen = computed(() => productStore.showDialog);
console.log("productdialog: productstore.showDialog=", isOpen);
</script>
