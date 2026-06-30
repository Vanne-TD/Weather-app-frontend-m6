// src/stores/weatherStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    cityId: null,          // ⭐ ID de ciudad
    weather: null,
    weekly: [],
    units: localStorage.getItem("units") || "metric",
    loading: false,
    error: null,
  }),

  getters: {
    stats(state) {
      if (!state.weekly.length) return null;

      const temps = state.weekly.map((d) => d.main.temp);
      const humidity = state.weekly.map((d) => d.main.humidity);
      const wind = state.weekly.map((d) => d.wind.speed);
      const descriptions = state.weekly.map((d) => d.weather[0].main);

      return {
        min: Math.round(Math.min(...temps)),
        max: Math.round(Math.max(...temps)),
        prom: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length),
        avgHumidity: Math.round(
          humidity.reduce((a, b) => a + b, 0) / humidity.length
        ),
        rainyDays: descriptions.filter((d) => d === "Rain").length,
        clearDays: descriptions.filter((d) => d === "Clear").length,
        windyDays: wind.filter((w) => w > 30).length,
      };
    },

    alerts(state) {
      if (!state.weekly.length) return [];

      const temps = state.weekly.map((d) => d.main.temp);
      const wind = state.weekly.map((d) => d.wind.speed);
      const descriptions = state.weekly.map((d) => d.weather[0].main);

      const alerts = [];

      if (Math.max(...temps) > 30) alerts.push("🔥 Ola de calor: temperaturas sobre 30°C");
      if (Math.min(...temps) < 0) alerts.push("❄️ Temperaturas bajo cero");
      if (wind.some((w) => w > 30)) alerts.push("💨 Viento fuerte sobre 30 km/h");

      const rainyDays = descriptions.filter((d) => d === "Rain").length;
      if (rainyDays >= 3) alerts.push("🌧️ Lluvia frecuente durante la semana");

      const clearDays = descriptions.filter((d) => d === "Clear").length;
      if (clearDays >= 5) alerts.push("☀️ Semana mayormente despejada");

      return alerts;
    },
  },

  actions: {
    async fetchWeatherById(id) {
      this.loading = true;
      this.error = null;

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=${this.units}&appid=${apiKey}`;
        const { data } = await axios.get(url);
        this.weather = data;
      } catch (err) {
        this.error = "No se pudo obtener el clima.";
      } finally {
        this.loading = false;
      }
    },

    async fetchWeeklyById(id) {
      this.loading = true;
      this.error = null;

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=${this.units}&appid=${apiKey}`;
        const { data } = await axios.get(url);
        this.weekly = data.list;
      } catch (err) {
        this.error = "No se pudo obtener el pronóstico semanal.";
      } finally {
        this.loading = false;
      }
    },

    toggleUnits() {
      this.units = this.units === "metric" ? "imperial" : "metric";
      localStorage.setItem("units", this.units);
    }
  },
});
