// notificationStore.js
import { defineStore } from "pinia";
import { watch } from "vue";

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [],
    confirmDialog: false, // Initially false
    confirmMessage: "", // Confirmation message
    confirmChoice: null, // This ref will hold the user's choice
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
    openConfirmDialog(message) {
      return new Promise((resolve) => {
        this.confirmDialog = true;
        this.confirmMessage = message;

        const unwatch = watch(
          () => this.confirmChoice,
          (value) => {
            if (value !== null) {
              unwatch();
              resolve(value);
              this.confirmChoice = null;
            }
          }
        );
      });
    },
    confirm() {
      this.confirmChoice = "confirm";
      this.confirmDialog = false; // Close the dialog
    },
    cancel() {
      this.confirmChoice = "cancel";
      this.confirmDialog = false; // Close the dialog
    },
  },
});
