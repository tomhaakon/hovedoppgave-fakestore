<template>
  <div v-if="UserStore.sessionAuth">
    <p>My Page</p>
    <div class="bg-green-500">
      <p>
        Hello!
        <div v-for="entry in UserStore.sessionAuth">
        {{ entry[1] }}
      </div>
      </p>
      <button class="btn btn-primary" @click="logOut()">Log out</button>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/UserStore";
import router from "../router";

const UserStore = useUserStore();
const logOut = () => {
  UserStore.logout();
  router.push("/");
};

console.log(UserStore.sessionAuth);
</script>
