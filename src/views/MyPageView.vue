<template>
  <div v-if="UserStore.isLoggedIn" class="px-5">
    <div class="">
      <p class="font-bold text-xl p-1 pb-5">MyPage</p>
    </div>
    <div class="pb-5">
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
            <div class="w-full pb-5">
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
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

const UserStore = useUserStore();
const loggedInUser = computed(() => UserStore.sessionAuth);
const purchaseHistory = computed(() => UserStore.user?.purchaseHistory || []);

console.log(purchaseHistory.value.length);

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * 10, 0);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Oslo", // or any other European time zone
    })
    .replace(",", " at");
};

// Usage example:
const formattedDate = formatDate("2023-08-16T12:00:52.753Z");
console.log(formattedDate); // Output might be "August 16, 2023, 12:00:52 PM"

//for ((purchase, index) in purchaseHistory) {
// //console.log(index)
// //}
// console.log(purchaseHistory.value.index);

// for (const [index, purchase] of purchaseHistory.value.entries()) {
//   //  console.log(purchase.items);
//   for (const [item] in purchase.items.entries()) {
//     console.log(item.price.price);
//   }
// }
</script>
