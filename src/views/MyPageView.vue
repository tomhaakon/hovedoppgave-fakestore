<template>
  <div v-if="UserStore.isLoggedIn">
    <div class="">
      <p class="font-bold text-xl p-1 pb-5">Login</p>
    </div>
    <div class="bg-green-500">
      <p>{{ loggedInUser }}</p>
      Hello
    </div>
    <button class="btn btn-primary" @click="logOut()">Log out</button>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/UserStore";
import router from "../router";

const UserStore = useUserStore();
const loggedInUser = computed(() => UserStore.sessionAuth);

const logOut = () => {
  UserStore.logout();
  router.push("/");
};
</script>
