<template> 
  <v-card v-if="weatherObject.weather"
          class="weather-card"
          elevation="4"
          color="rgb(255, 255, 255, 0.3)"
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
        <v-img :src="`https://www.weatherbit.io/static/img/icons/${weatherObject.weather.icon}.png`"
               :alt="weatherObject.weather.icon"
               height="100px"
               contain
        ></v-img>
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

    <div class="weather-card__temp">
      <div class="weather-card__temp-icon">
        <v-icon>mdi-thermometer-lines</v-icon>
      </div>
      <div class="weather-card__temp-text">
        {{ weatherObject.min_temp }}&deg;C / {{ weatherObject.max_temp }}&deg;C
      </div>
    </div>
  </v-card>
</template>
<script>
import moment from 'moment'

export default {
  name: 'WeatherCard',
  props: {
    weatherObject: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      moment
    }
  },
  computed: {
    dateTimeDisplay () {
      return moment(this.weatherObject.datetime).format('dd, DD. MMMM yyyy')
    }
  }
}
</script>
