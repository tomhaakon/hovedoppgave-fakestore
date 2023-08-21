<!-- ConfirmDialog.vue -->
<template>
  <div class=""></div>

  <div
    class="w-full h-full flex justify-center backdrop-blur-sm overlay"
    v-if="notifictionStore.confirmDialog"
  >
    <div class="fixed bg-white w-5/6 h-1/6 border bottom-2/4 p-3">
      <!-- <div>{{ notifictionStore.confirmMessage }}</div> -->
      <div class="pb-4 h-1/2">{{ title }}</div>
      <div class="flex justify-evenly h-1/2">
        <button class="btn btn-ghost" @click="function1">Yes</button>
        <button class="btn btn-primary" @click="function2">No</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useNotificationStore } from "@/stores/NotificationStore";
const notifictionStore = useNotificationStore();

const props = defineProps({
  title: {
    type: String,
    default: "You need to set prop text",
    required: true,
  },
  // showButton: {
  //   type: Boolean,
  //   default: true,
  // },
  // v-if="showButton"
  function1: {
    type: Function,
    required: true,
  },
  function2: {
    type: Function,
    required: true,
  },
});
</script>
<style scoped>
.overlay {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
