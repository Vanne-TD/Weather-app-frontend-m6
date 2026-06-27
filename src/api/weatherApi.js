// src/api/weatherApi.js

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// ===============================
// Clima actual por ciudad
// ===============================
export async function getCurrentWeather(city, units = 'metric') {
  const url = `${BASE_URL}/weather?q=${city}&units=${units}&lang=es&appid=${API_KEY}`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Error al obtener clima actual')

  return await response.json()
}
// ===============================
// Pronóstico 5 días
// ===============================
export async function getForecast(city, units = 'metric') {
  const url = `${BASE_URL}/forecast?q=${city}&units=${units}&lang=es&appid=${API_KEY}`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Error al obtener pronóstico')

  return await response.json()
}
