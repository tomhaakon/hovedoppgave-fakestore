// notificationStore.js
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [],
    confirmDialog: false, // Initially false
    confirmMessage: "", // Confirmation message
    confirmChoice: null, // This ref will hold the user's choice
  }),
  actions: {
    // add notification
    addNotification(message, type, duration = 1000) {
      console.log("type", type);
      const id = new Date().getTime();
      this.notifications.push({ id, message, type });

      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    },
    // removing with timout or click
    removeNotification(id) {
      console.log("removeNotification called with id:", id);
      console.log("Before removing:", this.notifications);
      this.notifications = this.notifications.filter(
        (notif) => notif.id !== id,
      );
      console.log("After removing:", this.notifications);
    },
    //confirmation dialog
    toggleDialog() {
      this.confirmDialog = !this.confirmDialog;
      console.log(this.confirmDialog);
    },
  },
});
