<template>
  <div class="w-full">
    <div class=""></div>
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
      <div class="w-full">
        <button @click="register" class="btn btn-primary w-32">Register</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore.js";
import router from "@/router";

const userStore = useUserStore();
const username = ref("");
const password = ref("");

const register = () => {
  userStore.register(username.value, password.value);
  router.push("/mypage");
};
</script>
