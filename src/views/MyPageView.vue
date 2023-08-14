<template>
  <p>My Page</p>
  <div v-for="user in getUser">
    <div class="bg-red-500">
      <div class="bg-green-500">
        <p>
          Hello!
          {{ user.username }}
        </p>
        <button class="btn btn-primary" @click="logOut()">Log out</button>
      </div>
    </div>
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
