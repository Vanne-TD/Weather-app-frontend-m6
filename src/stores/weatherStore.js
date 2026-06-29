// src/stores/weatherStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    city: 'Santiago',
    weather: null,
    weekly: [],
    units: 'metric',
    loading: false,
    error: null
  }),

  actions: {
    async fetchWeather() {
      this.loading = true
      this.error = null

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=${this.units}&appid=${apiKey}`
        const { data } = await axios.get(url)
        this.weather = data
      } catch (err) {
        this.error = 'No se pudo obtener el clima.'
      } finally {
        this.loading = false
      }
    },

    async fetchWeekly() {
      this.loading = true
      this.error = null

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=${this.units}&appid=${apiKey}`
        const { data } = await axios.get(url)
        this.weekly = data.list
      } catch (err) {
        this.error = 'No se pudo obtener el pronóstico semanal.'
      } finally {
        this.loading = false
      }
    },

    setCity(newCity) {
      this.city = newCity
    },

    toggleUnits() {
      this.units = this.units === 'metric' ? 'imperial' : 'metric'
    }
  }
})
