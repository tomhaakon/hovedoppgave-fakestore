<template>
  <div v-if="UserStore.isLoggedIn" class="px-5">
    <div class="">
      <p class="font-bold text-xl p-1 pb-5">MyPage</p>
    </div>
    <div class="pb-5">
      Hello <span class="font-bold">{{ loggedInUser }}</span
      ><span>, this is your purchase history</span>
    </div>
    <div class="bg-cyan-200">
      <div class="space-y-5">
        <div v-for="(purchase, index) in purchaseHistory" :key="index">
          <div class="w-full"></div>
          <div class="flex">
            <div class="w-20">x</div>
            <div class="w-full">{{ purchase.date }}</div>
          </div>
          <div class="bg-red-500">
            <div
              v-for="(item, itemIndex) in purchase.items"
              :key="itemIndex"
              class="flex"
            >
              <div class="w-20">{{ item.price }}</div>
              <div class="w-full">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

const totalPrice = ref([]);

const UserStore = useUserStore();
const loggedInUser = computed(() => UserStore.sessionAuth);
const purchaseHistory = computed(() => UserStore.user?.purchaseHistory || []);

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
