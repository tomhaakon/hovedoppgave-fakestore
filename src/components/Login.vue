<template>
  <div class="w-full">
    <div class="card w-full max-w-xl bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Login</h2>
        <div class="w-full text-center">
          <div class="p-2">
            <input
              v-model="username"
              placeholder="Username"
              class="input rounded-none bg-gray-200"
            />
          </div>
          <div class="p-2">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="input rounded-none bg-gray-200"
            />
            <div class="w-full text-center pt-5">
              <div v-if="error" class="text-center font-bold text-red-500 py-5">
                Invalid login details
              </div>
              <div class="w-full"></div>
            </div>
          </div>
        </div>

        <div class="card-actions justify-end">
          <button @click="login" class="btn btn-primary w-32 rounded-none">
            Login
          </button>
        </div>
        <div class="w-full text-center pt-10">
          <RouterLink to="/register">
            <p>if you dont have an account click here to register a new user</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore.js";

//stores
const userStore = useUserStore();

//refs
const username = ref("");
const password = ref("");
const error = ref(false);

//functions
const login = () => {
  if (!userStore.login(username.value, password.value)) {
    error.value = true;
  } else {
  }
};
//end
</script>
