// notificationStore.js
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [],
  }),
  actions: {
    addNotification(message, type, duration = 3000) {
      console.log("type", type);
      const id = new Date().getTime();
      this.notifications.push({ id, message, type });

      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    },
    removeNotification(id) {
      console.log("removeNotification called with id:", id);
      console.log("Before removing:", this.notifications);
      this.notifications = this.notifications.filter(
        (notif) => notif.id !== id
      );
      console.log("After removing:", this.notifications);
    },
  },
});
