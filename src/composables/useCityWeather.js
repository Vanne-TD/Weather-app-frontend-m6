import { useWeatherStore } from "@/stores/weatherStore";

export function useCityWeather() {
  const weatherStore = useWeatherStore();

  async function loadCityWeather(cityName) {
    const data = await weatherStore.fetchWeatherByName(cityName);
    if (!data || !data.id) return null;

    await weatherStore.fetchWeatherById(data.id);
    await weatherStore.fetchWeeklyById(data.id);

    return data;
  }

  return {
    loadCityWeather,
  };
}
