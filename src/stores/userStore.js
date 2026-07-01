// src/stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    preferences: {
      units: 'metric'
    },
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  }),

  actions: {
    init() {
      const savedUser = localStorage.getItem('user')
      const savedAuth = localStorage.getItem('isAuthenticated')
      const savedPrefs = localStorage.getItem('preferences')
      const savedFavorites = localStorage.getItem('favorites')

      if (savedUser && savedAuth === 'true') {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }

      if (savedPrefs) {
        this.preferences = JSON.parse(savedPrefs)
      }

      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites)
      }
    },

    login(userData) {
      this.user = userData
      this.isAuthenticated = true
      this.favorites = Array.isArray(userData.favorites) ? userData.favorites : this.favorites

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('preferences', JSON.stringify(this.preferences))
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    logout() {
      this.user = null
      this.isAuthenticated = false

      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('preferences')
      localStorage.removeItem('favorites')
    },

    updatePreferences(newPrefs) {
      this.preferences = { ...this.preferences, ...newPrefs }
      localStorage.setItem('preferences', JSON.stringify(this.preferences))
    },

    addFavorite(city) {
      if (!city || this.favorites.includes(city)) return

      this.favorites = [...this.favorites, city]
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    removeFavorite(city) {
      this.favorites = this.favorites.filter((item) => item !== city)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  }
})
