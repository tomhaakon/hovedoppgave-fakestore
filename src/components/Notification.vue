<template>
  <transition-group
    name="fade"
    tag="div"
    class="fixed bottom-4 right-0 z-50 px-4 w-full space-y-4"
  >
    <div
      v-for="notification in store.notifications"
      :key="notification.id"
      :class="[
        notification.type === 'success' ? 'bg-success' : 'bg-error',
        'text-black',
        'p-2',
        'rounded-lg',
        'cursor-pointer',
        'flex',
        'h-full',
      ]"
      @click="removeNotification(notification.id)"
    >
      <div class="w-1/5">
        <div v-if="notification.type === 'success'">
          <span class="material-symbols-outlined icon-size"> done </span>
        </div>

        <div else v-if="notification.type === 'error'">
          <span class="material-symbols-outlined icon-size">
            notification_important
          </span>
        </div>
      </div>
      <div class="w-4/5">{{ notification.message }}</div>
    </div>
  </transition-group>
</template>

<script setup>
import { useNotificationStore } from "@/stores/NotificationStore.js";

const store = useNotificationStore();
const removeNotification = store.removeNotification;
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 1; /* Fully visible at the start */
}
.fade-leave-active {
  opacity: 0; /* Fade to transparent */
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  color: white;
}
.icon-size {
  font-size: 48px;
}
</style>
