<template>
  <div class="weather-container">
    <div class="content-wrapper">
      <!-- Weather Input -->
      <div v-if="!weather" class="weather-input-container">
        <input
          v-model="location"
          placeholder="City, State/Country"
          class="weather-input"
        />
        <button
          @click="fetchWeather"
          class="weather-button"
        >
          Get Weather
        </button>
      </div>

      <!-- Weather Display -->
      <div v-if="weather" class="weather-card">
        <div class="header">
          Today <span class="dropdown-arrow">▼</span>
        </div>
        <div class="main-content">
          <div class="temp-and-desc">
            <div class="temperature">{{ Math.round(weather.temperature) }}°</div>
            <div class="description">{{ weather.description }}</div>
          </div>
          <div class="icon">{{ getWeatherEmoji(weather.icon) }}</div>
        </div>
        <div class="location">{{ weather.location }}</div>
        <div class="date">{{ formattedDate }}</div>
        <div class="footer">
          Feels like {{ Math.round(weather.temperature - 2) }}° · Sunset 18:30
        </div>
      </div>

      <!-- Placeholder Text Section -->
      <div class="placeholder-text" v-if="weather">
        <h3>Random Text</h3>
        <p>Get accurate weather forecasts and alerts with our app. Stay informed about current and upcoming conditions with hourly and daily forecasts, radar maps, and severe weather alerts. Customize notifications to fit your needs.</p>
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

<style scoped>
.weather-container {
  background-image: url('@/assets/aa.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  min-height: 100dvh; /* For mobile browsers */
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1rem;
}

.weather-input-container {
  display: flex;
  background-color: white;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
}

.weather-input {
  flex-grow: 1;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.weather-input::placeholder {
  color: #999;
}

.weather-button {
  background-color: #ff8000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.weather-button:hover {
  background-color: #e67300;
}

.weather-card {
  background-color: #FFDAB9;
  border-radius: 1.5rem;
  padding: 1.5rem;
  width: 18rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #FFA07A;
  margin-bottom: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FF4500;
  font-size: 0.875rem;
  font-weight: 600;
}

.dropdown-arrow {
  font-size: 0.75rem;
}

.main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.temp-and-desc {
  text-align: left;
}

.temperature {
  font-size: 3rem;
  font-weight: 700;
  color: #FF6347;
}

.description {
  font-size: 1.25rem;
  color: #FF4500;
}

.icon {
  font-size: 3.75rem;
}

.location, .date {
  color: #FF6347;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.footer {
  color: #FF6347;
  font-size: 0.75rem;
  margin-top: 1rem;
}

.placeholder-text {
  padding: 1rem;
  width: 18rem;
  text-align: left;
}

.placeholder-text h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #ccc;
  margin-bottom: 0.5rem;
}

.placeholder-text p {
  font-size: 0.875rem;
  color: #ccc;
}
</style>