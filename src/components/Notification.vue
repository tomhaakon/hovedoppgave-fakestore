<template>
  <transition name="fade" appear>
    <div class="fixed top-0 right-0 z-50 w-full">
      <div
        v-for="notification in store.notifications"
        :key="notification.id"
        :class="[
          notification.type === 'success'
            ? 'bg-success'
            : notification.type === 'error'
            ? 'bg-error'
            : '',
          'text-white',
          'p-2',
          'shadow',
          'mb-2',
          'cursor-pointer',
        ]"
        @click="removeNotification(notification.id)"
      >
        {{ notification.message }}
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watchEffect } from "vue";
import { useNotificationStore } from "@/stores/NotificationStore.js";

const store = useNotificationStore();
const removeNotification = store.removeNotification;

watchEffect(() => {
  const notifications = store.notifications;
  // ... any additional logic you want to perform on change
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
