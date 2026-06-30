// src/api/weatherApi.js

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeatherById(id, units = "metric") {
  const url = `${BASE_URL}/weather?id=${id}&units=${units}&lang=es&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener clima actual");
  return await response.json();
}

export async function getForecastById(id, units = "metric") {
  const url = `${BASE_URL}/forecast?id=${id}&units=${units}&lang=es&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener pronóstico");
  return await response.json();
}

export async function getCityByName(name, units = "metric") {
  const url = `${BASE_URL}/weather?q=${name}&units=${units}&lang=es&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener ciudad");
  return await response.json();
}