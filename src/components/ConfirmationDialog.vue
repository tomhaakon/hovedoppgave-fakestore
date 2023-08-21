<!-- ConfirmDialog.vue -->
<template>
  <div
    v-if="useNotificationStore().confirmDialog"
    class="fixed z-50 bg-white w-full h-full"
  >
    <div>{{ useNotificationStore().confirmMessage }}</div>
    <button @click="useNotificationStore().confirm">Yes</button>
    <button @click="useNotificationStore().cancel">No</button>
  </div>
  <div v-else class="text-red-500">confirm dialog: not open</div>
</template>
<script setup>
import { useNotificationStore } from "@/stores/NotificationStore";
</script>
