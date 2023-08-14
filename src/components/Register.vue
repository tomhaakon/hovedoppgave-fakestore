<template>
  <div>
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="register">Register</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore.js";

const userStore = useUserStore();
const username = ref("");
const password = ref("");

const register = () => {
  userStore.register(username.value, password.value);
};
</script>
