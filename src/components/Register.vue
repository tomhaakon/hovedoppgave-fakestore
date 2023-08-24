<template>
  <div class="w-full space-y-5">
    <div class="card w-full max-w-md bg-base-100 shadow-md">
      <div class="card-body">
        <div class="">
          <p class="text-red-600 font-bold">
            This register form is for training purposes only so passwords are
            not encrypted and are stored in you browsers localStorage.
          </p>
        </div>
      </div>
    </div>
    <div class="cardw-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Register</h2>
        <div class="w-full text-center">
          <div class="p-2">
            <input
              v-model="username"
              placeholder="Username"
              class="input rounded-none"
            />
          </div>
          <div class="p-2">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="input rounded-none"
            />
          </div>
          <div v-for="error in userStore.errorMsg" :key="error">
            <p class="font-bold text-red-700">{{ error }}</p>
          </div>
        </div>

        <div class="card-actions justify-end">
          <button @click="register" class="btn btn-primary w-32 rounded-none">
            Register
          </button>
        </div>
        <div class="w-full text-center pt-10">
          <RouterLink to="/login">
            <p>return to log in section</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-green-500"></div>

  <div class="w-full text-center pt-5">
    <div class="w-full"></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/UserStore.js";

const userStore = useUserStore();
const username = ref("");
const password = ref("");
const error = userStore.errorMsg;
//const error = ref(userStore.errorMsg);

const register = () => userStore.register(username.value, password.value);
</script>
