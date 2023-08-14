<template>
  <div v-if="viewParam === 'login'">
    <div class="">
      <p class="font-bold text-xl p-1">Login</p>
    </div>
    <Login />
    <div class="w-full text-center px-14">
      <p class="py-5">or</p>
      <RouterLink to="/register">
        <p>click here to register new account</p>
      </RouterLink>
    </div>
  </div>
  <div v-if="viewParam === 'register'">
    <div class="">
      <p class="font-bold text-xl p-1">Register</p>
      <p class="p-5 text-red-600">
        This register form is for training purposes only so passwords are not
        encrypted and are stored in you browsers localStorage.
      </p>
    </div>
    <Register />
    <div class="w-full text-center py-5 px-14">
      <RouterLink to="/login">
        <p>return to log in section</p>
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/UserStore";
import router from "../router";
import { RouterLink } from "vue-router";

const userStore = useUserStore();
const user = userStore.user;
const viewParam = ref();

viewParam.value = router.currentRoute.value.name;

watch(
  () => router.currentRoute.value.name,
  (newParam) => {
    viewParam.value = newParam;
    console.log("changed", newParam);
  }
);

console.log("testing: ", router.currentRoute.value.name);
console.log("userview loaded");
</script>
