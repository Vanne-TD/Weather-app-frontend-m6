// src/stores/weatherStore.js
import { defineStore } from "pinia";
import { getCurrentWeatherById, getForecastById } from "@/api/weatherApi";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    cityId: null,
    weather: null,
    weekly: [],
    units: localStorage.getItem("units") || "metric",

    // ⭐ Tema parcial: light | contrast
    theme: localStorage.getItem("theme") || "light",

    stats: null,
    alerts: [],

    favoriteCity: localStorage.getItem("favoriteCity") || null,
    recentCities: JSON.parse(localStorage.getItem("recentCities") || "[]"),

    alertPreferences: JSON.parse(
      localStorage.getItem("alertPreferences") ||
        JSON.stringify({
          heat: true,
          cold: true,
          wind: true,
          rain: true,
        }),
    ),

    loading: false,
    error: null,
  }),

  actions: {
    // ⭐ Tema parcial (solo afecta <main>)
    toggleTheme() {
      this.theme = this.theme === "light" ? "contrast" : "light";
      localStorage.setItem("theme", this.theme);
    },

    toggleUnits() {
      this.units = this.units === "metric" ? "imperial" : "metric";
      localStorage.setItem("units", this.units);

      if (this.cityId) {
        this.fetchWeatherById(this.cityId);
        this.fetchWeeklyById(this.cityId);
      }
    },

    async fetchWeatherByName(cityName) {
      try {
        this.loading = true;
        this.error = null;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${this.units}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
          this.error = "Ciudad no encontrada";
          return null;
        }

        return data;
      } catch (err) {
        this.error = "Error al buscar ciudad";
        return null;
      } finally {
        this.loading = false;
      }
    },

    async fetchWeatherById(id) {
      try {
        this.loading = true;
        this.error = null;

        const data = await getCurrentWeatherById(id, this.units);
        this.weather = data;
        this.cityId = data.id;

        if (data.name) {
          this.addRecentCity(data.name);
        }
      } catch (err) {
        this.error = "Error al obtener el clima actual";
      } finally {
        this.loading = false;
      }
    },

    async fetchWeeklyById(id) {
      try {
        this.loading = true;
        this.error = null;

        const data = await getForecastById(id, this.units);
        this.weekly = data.list || [];

        this.calculateStats();
        this.generateAlerts();
      } catch (err) {
        this.error = "Error al obtener el pronóstico semanal";
      } finally {
        this.loading = false;
      }
    },

    calculateStats() {
      if (!this.weekly || !this.weekly.length) {
        this.stats = null;
        return;
      }

      const temps = this.weekly.map((item) => item.main.temp);
      const humidities = this.weekly.map((item) => item.main.humidity);

      const min = Math.min(...temps);
      const max = Math.max(...temps);
      const prom = temps.reduce((sum, t) => sum + t, 0) / temps.length;
      const avgHumidity =
        humidities.reduce((sum, h) => sum + h, 0) / humidities.length;

      let rainyDays = 0;
      let clearDays = 0;
      let windyDays = 0;

      this.weekly.forEach((item) => {
        const desc = item.weather[0].description.toLowerCase();
        const wind = item.wind.speed;

        if (desc.includes("lluvia")) rainyDays++;
        if (desc.includes("despejado") || desc.includes("clear")) clearDays++;
        if (wind > 8) windyDays++;
      });

      this.stats = {
        min: Math.round(min),
        max: Math.round(max),
        prom: Math.round(prom),
        avgHumidity: Math.round(avgHumidity),
        rainyDays,
        clearDays,
        windyDays,
      };
    },

    generateAlerts() {
      if (!this.weekly || !this.weekly.length) {
        this.alerts = [];
        return;
      }

      const alerts = [];

      const hasHeatWave = this.weekly.some(
        (item) => item.main.temp > (this.units === "metric" ? 30 : 86),
      );
      const hasColdWave = this.weekly.some(
        (item) => item.main.temp < (this.units === "metric" ? 0 : 32),
      );
      const hasStrongWind = this.weekly.some((item) => item.wind.speed > 10);
      const hasRain = this.weekly.some((item) =>
        item.weather[0].description.toLowerCase().includes("lluvia"),
      );

      if (hasHeatWave) alerts.push("⚠️ Ola de calor en los próximos días.");
      if (hasColdWave) alerts.push("❄️ Temperaturas muy bajas previstas.");
      if (hasStrongWind) alerts.push("💨 Viento fuerte en el pronóstico.");
      if (hasRain) alerts.push("🌧️ Lluvias previstas durante la semana.");

      this.alerts = alerts;
    },

    setAlertPreference(type, value) {
      this.alertPreferences[type] = value;
      localStorage.setItem(
        "alertPreferences",
        JSON.stringify(this.alertPreferences),
      );
    },

    filteredAlerts() {
      return this.alerts.filter((alert) => {
        const a = alert.toLowerCase();

        if (a.includes("calor")) return this.alertPreferences.heat;
        if (a.includes("bajas")) return this.alertPreferences.cold;
        if (a.includes("viento")) return this.alertPreferences.wind;
        if (a.includes("lluvias")) return this.alertPreferences.rain;

        return true;
      });
    },

    setFavoriteCity(cityName) {
      this.favoriteCity = cityName;
      localStorage.setItem("favoriteCity", cityName);
    },

    clearFavoriteCity() {
      this.favoriteCity = null;
      localStorage.removeItem("favoriteCity");
    },

    addRecentCity(cityName) {
      if (!cityName) return;

      const list = [...this.recentCities];

      if (!list.includes(cityName)) list.unshift(cityName);

      this.recentCities = list.slice(0, 5);
      localStorage.setItem("recentCities", JSON.stringify(this.recentCities));
    },
  },
});
