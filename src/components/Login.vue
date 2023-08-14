<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <div v-if="error">Invalid login details</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore.js";
const userStore = useUserStore();
const username = ref("");
const password = ref("");
const error = ref(false);

console.log("se", userStore.user);
const login = () => {
  if (!userStore.login(username.value, password.value)) {
    error.value = true;
  }
};
</script>
