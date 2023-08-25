<template>
  <!-- if user is logged in -->
  <div
    v-if="UserStore.isLoggedIn"
    class="container mx-auto px-4 md:py-5 max-w-[800px] md:flex-row"
  >
    <div class="">
      <p class="font-bold text-xl pb-5">MyPage</p>
    </div>
    <div class="pb-5">
      <!-- hello username -->
      Hello <span class="font-bold">{{ loggedInUser }}</span>
      <p class="pt-5 font-bold">Purchase History</p>
    </div>
    <div class="">
      <div class="space-y-5">
        <div
          v-for="(purchase, index) in purchaseHistory"
          :key="index"
          v-if="purchaseHistory.length > 0"
        >
          <div></div>
          <div class="w-full bg-gray-200 flex">
            <div class="pr-2 w-20">#{{ index }}</div>
            <div class="w-full">{{ formatDate(purchase.date) }}</div>
          </div>
          <div class="flex">
            <div class="w-full"></div>
          </div>
          <div class="">
            <div
              v-for="(item, itemIndex) in purchase.items"
              :key="itemIndex"
              class="flex"
            >
              <div class="w-20">{{ item.price }}</div>
              <div class="w-full">{{ item.title }}</div>
            </div>
          </div>
          <div class="flex pt-2">
            <div class="w-20">total</div>
            <div class="w-full">
              <p class="font-bold">
                {{ calculateTotalPrice(purchase.items) }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>You havent purchased anything yet.</div>
      </div>
    </div>
  </div>
</template>
<script setup>
//import
import { computed } from "vue";
import { useUserStore } from "@/stores/UserStore";

//stores
const UserStore = useUserStore();

//functions

const loggedInUser = computed(() => UserStore.sessionAuth);

//have bought before
const purchaseHistory = computed(() => UserStore.user?.purchaseHistory || []);

//totalprice
const calculateTotalPrice = (items) => {
  const totalPrice = items.reduce((total, item) => total + item.price * 10, 0);
  return totalPrice.toFixed(2);
};

//format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Oslo",
    })
    .replace(",", " at");
};
//end
</script>
