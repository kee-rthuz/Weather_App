<template>
<div class="weather-container  w-full fixed top-0 left-0 bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: 'url(' + require('@/assets/aa.jpg') + ')' }">   
 <div class="flex justify-center items-center flex-col min-h-screen p-4">
      <!-- Weather Input -->
      <div v-if="!weather" class="flex bg-white rounded-md overflow-hidden w-full max-w-sm">
        <input
          v-model="location"
          placeholder="City, State/Country"
          class="flex-grow border-none py-2 px-4 text-sm"
        />
        <button
          @click="fetchWeather"
          class="bg-weather-orange text-white border-none py-2 px-4 text-sm cursor-pointer transition-colors duration-300 hover:bg-weather-orange-dark"
        >
          Get Weather
        </button>
      </div>

      <!-- Weather Display -->
      <div v-if="weather" class="bg-weather-peach-200 rounded-weather-card p-6 w-weather-card shadow-weather-card border-2 border-weather-peach-300 mb-4">
        <div class="flex justify-between items-center text-weather-red text-sm font-semibold">
          Today <span class="text-xs">▼</span>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-left">
            <div class="text-weather-temp font-bold text-weather-tomato">{{ Math.round(weather.temperature) }}°</div>
            <div class="text-weather-desc text-weather-red">{{ weather.description }}</div>
          </div>
          <div class="text-6xl">{{ getWeatherEmoji(weather.icon) }}</div>
        </div>
        <div class="text-weather-tomato text-sm mt-2">{{ weather.location }}</div>
        <div class="text-weather-tomato text-sm mt-2">{{ formattedDate }}</div>
        <div class="text-weather-tomato text-xs mt-4">
          Feels like {{ Math.round(weather.temperature - 2) }}° · Sunset 18:30
        </div>
      </div>

      <!-- Placeholder Text Section -->
      <div v-if="weather" class="p-4 w-weather-card text-left">
        <h3 class="text-base font-semibold text-gray-300 mb-2">Random Text</h3>
        <p class="text-sm text-gray-300">
          Get accurate weather forecasts and alerts with our app. Stay informed about current and upcoming conditions with hourly and daily forecasts, radar maps, and severe weather alerts. Customize notifications to fit your needs.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  name: 'WeatherComponent',
  setup() {
    const location = ref('');
    const weather = ref(null);

    const fetchWeather = async () => {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            mutation {
              fetchWeather(location: "${location.value}") {
                location
                date
                temperature
                description
                icon
              }
            }
          `
        });
        weather.value = response.data.data.fetchWeather;
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    const formattedDate = computed(() => {
      let date = weather.value?.date ? new Date(weather.value.date) : new Date();
      if (isNaN(date.getTime())) {
        date = new Date();
      }
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    });

    const getWeatherEmoji = (icon) => {
      const emojiMap = {
        '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️',
      };
      return emojiMap[icon] || '🌡️';
    };

    return { 
      location, 
      weather, 
      fetchWeather, 
      formattedDate,
      getWeatherEmoji,
    };
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';


</style>