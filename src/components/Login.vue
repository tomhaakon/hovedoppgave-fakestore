<template>
  <div class="w-full">
    <div class="w-full text-center">
      <div class="p-2">
        <input v-model="username" placeholder="Username" class="input" />
      </div>
      <div class="p-2">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="input"
        />
      </div>
    </div>
    <div class="bg-green-500"></div>
    <div class="w-full text-center pt-5">
      <div v-if="error" class="text-center font-bold text-red-500 py-5">
        Invalid login details
      </div>
      <div class="w-full">
        <button @click="login" class="btn btn-primary w-32">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/UserStore.js";
const userStore = useUserStore();
const username = ref("");
const password = ref("");
const error = ref(false);

const login = () => {
  if (!userStore.login(username.value, password.value)) {
    error.value = true;
  } else {
  }
};
</script>
