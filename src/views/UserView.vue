<template>
  <div class="container mx-auto px-4 flex justify-center">
    <div v-if="viewParam === 'thanks'" class="text-center space-y-5">
      <p class="pt-10">Thank you for purchasing!</p>
      <p>
        Your products will be shipped within the next 2 years, so do not hold
        your breath.
      </p>
    </div>
    <div v-else-if="userStore.sessionAuth">you are allready logged in</div>
    <div v-else class="">
      <div v-if="viewParam === 'login'" class="pt-5">
        <Login />
      </div>
      <div v-if="viewParam === 'register'" class="pt-5">
        <Register />
      </div>
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
  }
);
</script>
