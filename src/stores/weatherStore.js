// src/stores/weatherStore.js
import { defineStore } from "pinia";
import { getCurrentWeatherById, getForecastById } from "@/api/weatherApi";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    // Ciudad actual (ID de OpenWeather)
    cityId: null,

    // Clima actual
    weather: null,

    // Pronóstico semanal (lista cruda de la API)
    weekly: [],

    // Unidades (metric / imperial)
    units: localStorage.getItem("units") || "metric",

    // Tema (light / dark)
    theme: localStorage.getItem("theme") || "light",

    // Estadísticas calculadas de la semana
    stats: null,

    // Alertas generadas a partir del pronóstico
    alerts: [],

    // Ciudad favorita (ID o nombre, según cómo la uses)
    favoriteCity: localStorage.getItem("favoriteCity") || null,

    // Últimas ciudades buscadas (array de nombres o IDs)
    recentCities: JSON.parse(localStorage.getItem("recentCities") || "[]"),

    // Estados de UI
    loading: false,
    error: null,
  }),

  actions: {
    // =========================
    // TEMA
    // =========================
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", this.theme);
    },

    // =========================
    // UNIDADES
    // =========================
    toggleUnits() {
      this.units = this.units === "metric" ? "imperial" : "metric";
      localStorage.setItem("units", this.units);

      // Si ya tenemos una ciudad cargada, recargar datos
      if (this.cityId) {
        this.fetchWeatherById(this.cityId);
        this.fetchWeeklyById(this.cityId);
      }
    },

    // =========================
    // CLIMA ACTUAL POR ID
    // =========================
    async fetchWeatherById(id) {
      try {
        this.loading = true;
        this.error = null;

        const data = await getCurrentWeatherById(id, this.units);
        this.weather = data;
        this.cityId = data.id;

        // Guardar en recientes (por nombre)
        if (data.name) {
          this.addRecentCity(data.name);
        }
      } catch (err) {
        this.error = "Error al obtener el clima actual";
      } finally {
        this.loading = false;
      }
    },

    // =========================
    // PRONÓSTICO SEMANAL POR ID
    // =========================
    async fetchWeeklyById(id) {
      try {
        this.loading = true;
        this.error = null;

        const data = await getForecastById(id, this.units);
        this.weekly = data.list || [];

        // Calcular estadísticas
        this.calculateStats();

        // Generar alertas
        this.generateAlerts();
      } catch (err) {
        this.error = "Error al obtener el pronóstico semanal";
      } finally {
        this.loading = false;
      }
    },

    // =========================
    // ESTADÍSTICAS DE LA SEMANA
    // =========================
    calculateStats() {
      if (!this.weekly || !this.weekly.length) {
        this.stats = null;
        return;
      }

      const temps = this.weekly.map((item) => item.main.temp);
      const humidities = this.weekly.map((item) => item.main.humidity);

      const min = Math.min(...temps);
      const max = Math.max(...temps);
      const prom =
        temps.reduce((sum, t) => sum + t, 0) / (temps.length || 1);

      const avgHumidity =
        humidities.reduce((sum, h) => sum + h, 0) / (humidities.length || 1);

      // Contadores simples de días según descripción
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

    // =========================
    // ALERTAS DEL CLIMA
    // =========================
    generateAlerts() {
      if (!this.weekly || !this.weekly.length) {
        this.alerts = [];
        return;
      }

      const alerts = [];

      // Ejemplo simple de reglas:
      const hasHeatWave = this.weekly.some(
        (item) => item.main.temp > (this.units === "metric" ? 30 : 86)
      );
      const hasColdWave = this.weekly.some(
        (item) => item.main.temp < (this.units === "metric" ? 0 : 32)
      );
      const hasStrongWind = this.weekly.some((item) => item.wind.speed > 10);
      const hasRain = this.weekly.some((item) =>
        item.weather[0].description.toLowerCase().includes("lluvia")
      );

      if (hasHeatWave) {
        alerts.push("⚠️ Ola de calor en los próximos días.");
      }
      if (hasColdWave) {
        alerts.push("❄️ Temperaturas muy bajas previstas.");
      }
      if (hasStrongWind) {
        alerts.push("💨 Viento fuerte en el pronóstico.");
      }
      if (hasRain) {
        alerts.push("🌧️ Lluvias previstas durante la semana.");
      }

      this.alerts = alerts;
    },

    // =========================
    // CIUDAD FAVORITA
    // =========================
    setFavoriteCity(cityIdOrName) {
      this.favoriteCity = cityIdOrName;
      localStorage.setItem("favoriteCity", cityIdOrName);
    },

    // =========================
    // CIUDADES RECIENTES
    // =========================
    addRecentCity(cityName) {
      if (!cityName) return;

      const list = [...this.recentCities];

      // Evitar duplicados
      const exists = list.includes(cityName);
      if (!exists) {
        list.unshift(cityName);
      }

      // Limitar a 5 últimas
      this.recentCities = list.slice(0, 5);
      localStorage.setItem("recentCities", JSON.stringify(this.recentCities));
    },
  },
});
