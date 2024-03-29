<template> 
  <v-card v-if="weatherObject"
          :class="['weather-card', { 'weather-card--daily': !this.dataIsArray }]"
          elevation="4"
  >
    <div class="weather-card__heading">
      <div class="weather-card__title">
        {{ weatherObject.weather.description }}
      </div>
      <div class="weather-card__subtitle">
        {{ dateTimeDisplay }}
      </div>
    </div>

    <div class="weather-card__display">
      <div class="weather-card__display-temp">
        {{ weatherObject.temp }}&deg;C
      </div>
      <div class="weather-card__display-image">
        <v-img :src="`https://www.weatherbit.io/static/img/icons/${weatherObject.weather.icon}.png`" :alt="weatherObject.weather.icon"></v-img>
      </div>
    </div>

    <div class="weather-card__wind">
      <div class="weather-card__wind-icon">
        <v-icon>mdi-weather-windy</v-icon>
      </div>
      <div class="weather-card__wind-text">
        {{ Number(weatherObject.wind_spd).toFixed(2) }} km/h
      </div>
    </div>

    <div class="weather-card__precipation">
      <div class="weather-card__precipation-icon">
        <v-icon>mdi-weather-pouring</v-icon>
      </div>
      <div class="weather-card__precipation-text">
        {{ weatherObject.pop }}%
      </div>
    </div>

    <div v-if="!this.dataIsArray" class="weather-card__temp">
      <div class="weather-card__temp-icon">
        <v-icon>mdi-thermometer-lines</v-icon>
      </div>
      <div class="weather-card__temp-text">
        {{ weatherObject.min_temp }}&deg;C / {{ weatherObject.max_temp }}&deg;C
      </div>
    </div>

    <v-slider v-if="dataIsArray"
              v-model="slider"
              :max="weatherData.length - 1"
              :tick-labels="sliderLabel"
              ticks
    ></v-slider>
  </v-card>
</template>
<script>
import moment from 'moment'

export default {
  name: 'WeatherCard',
  props: {
    weatherData: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      moment,
      slider: 0
    }
  },
  computed: {
    dataIsArray() {
      return Array.isArray(this.weatherData)
    },
    weatherObject () {
      if (this.dataIsArray) {
        return this.weatherData[this.slider]
      }
      return this.weatherData
    },
    sliderLabel () {
      return this.weatherData.map(weather => moment(weather.timestamp_local).format('H'))
    },
    dateTimeDisplay () {
      if (this.dataIsArray) {
        return moment(this.weatherObject.timestamp_local).format('LT')
      }
      return moment(this.weatherObject.datetime).format('dd, DD. MMMM yyyy')
    }
  }
}
</script>
