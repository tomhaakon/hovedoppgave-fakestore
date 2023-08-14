<template>
  <p>My Page</p>
  <div class="bg-green-500">
    <p>
      Hello!
      {{ UserStore.user }}
    </p>
    <button class="btn btn-primary" @click="logOut()">Log out</button>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/UserStore";
import router from "../router";

const UserStore = useUserStore();
const getUser = UserStore.user;

const logOut = () => {
  UserStore.logout();
  router.push("/");
};
</script>
