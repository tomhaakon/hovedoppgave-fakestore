<template>
  <div class="w-full bg-red-500"><p class="font-bold text-xl">Login</p></div>
</template>
<script setup>
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import useUserStore from "../stores/UserStore.js";

const userStore = useUserStore.user;
</script>
