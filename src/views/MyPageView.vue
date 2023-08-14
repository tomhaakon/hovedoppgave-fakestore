<template>
  <p>mypage</p>
  <div v-for="user in getUser">
    <div class="bg-red-500">
      <div class="bg-green-500">user:{{ user }}</div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/UserStore";

const UserStore = useUserStore();
const getUser = UserStore.user;
console.log(getUser);
</script>
