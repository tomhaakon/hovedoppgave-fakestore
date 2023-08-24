<template>
  <div class="w-full space-y-5">
    <div class="card w-full max-w-md bg-base-100 shadow-md">
      <div class="card-body">
        <!-- note for users that they dont use their usual passwords -->
        <div class="">
          <p class="text-red-600 font-bold">
            This register form is for training purposes only so passwords are
            not encrypted and are stored in you browsers localStorage.
          </p>
        </div>
      </div>
    </div>
    <!-- register card -->
    <div class="cardw-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Register</h2>
        <div class="w-full text-center">
          <!-- username -->
          <div class="p-2">
            <input
              v-model="username"
              placeholder="Username"
              class="input rounded-none"
            />
          </div>
          <!-- password -->
          <div class="p-2">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="input rounded-none"
            />
          </div>
          <!-- error messages -->
          <div v-for="error in userStore.errorMsg" :key="error">
            <p class="font-bold text-red-700">{{ error }}</p>
          </div>
        </div>
        <!--  register button -->
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
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore.js";

//stores
const userStore = useUserStore();

//refs
const username = ref("");
const password = ref("");

//functions
const register = () => userStore.register(username.value, password.value);
</script>
