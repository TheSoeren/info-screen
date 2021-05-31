<template>
  <div class="weather">
    <div class="weather__today">
      <h2>Heute</h2>
      <weather-card :weather-data="hourlyToday"></weather-card>
    </div>
    <div class="weather__tomorrow">
      <h2>Morgen</h2>
      <weather-card :weather-data="hourlyTomorrow"></weather-card>
    </div>
    <div class="weather__week">
      <h2>Prognose</h2>
      <v-row>
        <v-col v-for="day in dailyTenDays"
               :key="day.timestamp_local"
               :cols="breakpointMd ? 12 : 3"
        >
          <weather-card :weather-data="day"></weather-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import WeatherCard from './WeatherCard.vue'

export default {
  name: 'Weather',
  components: { WeatherCard },
  data () {
    return {
      moment,
      current: [],
      forecast: [],
      hourly: []
    }
  },
  computed: {
    hourlyToday () {
      const hoursToday = []
      for (const hour of this.hourly) {
        hoursToday.push(hour)
        if (hour.timestamp_local.includes('00:00:00')) {
          return hoursToday
        }
      }
      return hoursToday
    },
    hourlyTomorrow () {
      const hoursTomorrow = []
      let isTomorrow = false
      for (const hour of this.hourly) {
        if (isTomorrow) {
          hoursTomorrow.push(hour)
        }

        if (hour.timestamp_local.includes('00:00:00')) {
          if (isTomorrow) {
            return hoursTomorrow
          } else {
            isTomorrow = true
          }
        }
      }
      return hoursTomorrow
    },
    dailyTenDays () {
      return this.forecast.slice(1, 13)
    },
    breakpointMd () {
      return this.$vuetify.breakpoint.width <= 768
    }
  },
  async created () {
    const responseHourly = await fetch('http://api.weatherbit.io/v2.0/forecast/hourly?lon=9.4903&lat=47.478&key=cd5ab4e63b284752a69f36765fefb889&lang=de')
    this.hourly = (await responseHourly.json()).data

    const responseCurrent = await fetch('http://api.weatherbit.io/v2.0/current?lon=9.4903&lat=47.478&key=cd5ab4e63b284752a69f36765fefb889&lang=de')
    this.current = (await responseCurrent.json()).data

    const responseForecast = await fetch('http://api.weatherbit.io/v2.0/forecast/daily?lon=9.4903&lat=47.478&key=cd5ab4e63b284752a69f36765fefb889&lang=de')
    this.forecast = (await responseForecast.json()).data
  }
}
</script>
