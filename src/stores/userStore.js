// src/stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    preferences: {
      units: 'metric'
    }
  }),

  actions: {
    login(userData) {
      this.user = userData
      this.isAuthenticated = true
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },

    updatePreferences(newPrefs) {
      this.preferences = { ...this.preferences, ...newPrefs }
    }
  }
})
