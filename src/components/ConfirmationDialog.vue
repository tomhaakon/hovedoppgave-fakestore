<template>
  <div
    class="w-full h-full flex justify-center backdrop-blur-sm overlay"
    v-if="notifictionStore.confirmDialog"
  >
    <div
      class="fixed bg-white w-3/4 min-h-[200px] border bottom-2/4 p-6 md:w-[400px]"
    >
      <div class="pb-4 h-1/2">{{ title }}</div>
      <div class="flex justify-evenly h-1/2 py-5">
        <button class="btn btn-secondary rounded-none" @click="function1">
          Yes
        </button>
        <button
          class="btn rounded-none btn-secondary"
          @click="notifictionStore.confirmDialog = false"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
//import
import { useNotificationStore } from "@/stores/NotificationStore";

//stores
const notifictionStore = useNotificationStore();

// props
const props = defineProps({
  title: {
    type: String,
    default: "You need to set prop text",
    required: true,
  },
  function1: {
    type: Function,
  },
});
//end
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
