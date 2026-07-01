// src/api/weatherApi.js

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function buildUrl(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error("Falta la API key de OpenWeather. Añade VITE_WEATHER_API_KEY en tu archivo .env");
  }

  const query = new URLSearchParams({
    appid: API_KEY,
    lang: 'es',
    ...params,
  });

  return `${BASE_URL}${endpoint}?${query.toString()}`;
}

export async function getCurrentWeatherById(id, units = "metric") {
  const url = buildUrl("/weather", { id, units });
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener clima actual");
  return await response.json();
}

export async function getForecastById(id, units = "metric") {
  const url = buildUrl("/forecast", { id, units });
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener pronóstico");
  return await response.json();
}

export async function getCityByName(name, units = "metric") {
  const url = buildUrl("/weather", { q: name, units });
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener ciudad");
  return await response.json();
}