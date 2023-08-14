<template>
  <div v-if="!user" class="w-full px-10">
    <div v-if="loginView">
      <div class="">
        <p class="font-bold text-xl p-1">Login</p>
      </div>
      <Login />
      <div class="w-full text-center px-14" @click="toggleLoginView()">
        <p class="py-5">or</p>
        <p>click here to register new account</p>
      </div>
    </div>
    <div v-else>
      <div class="">
        <p class="font-bold text-xl p-1">Register</p>
        <p class="p-5 text-red-600">
          This register form is for training purposes only so passwords are not
          encrypted and are stored in you browsers localStorage.
        </p>
      </div>
      <Register />
      <div class="w-full text-center py-5 px-14" @click="toggleLoginView()">
        <p>return to log in section</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import { computed, ref, watch } from "vue";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const user = userStore.user;
const loginView = ref(true);

const toggleLoginView = () => {
  loginView.value = !loginView.value;
  console.log("loginView changed to:", loginView.value);
};

console.log("userview loaded");
console.log("loginView", loginView.value);
</script>
