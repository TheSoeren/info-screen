<template>
  <div class="dashboard">
    <div class="dashboard__weather">
      <router-link to="/weather">
        <minimal-weather :weather-object="weather"></minimal-weather>
      </router-link>
    </div>
    <div class="dashboard__events-container">
      <router-link to="/calendar">
        <v-card class="dashboard__events" color="rgb(255, 255, 255, 0.3)" elevation="4">
          <v-row class="dashboard__events-participants" no-gutters>
            <v-col cols="6">Fabian</v-col>
            <v-col cols="6">Nadine</v-col>
          </v-row>
          <v-row v-for="event in eventsToday"
                :key="event.id"
                class="mb-1"
                no-gutters
          >
            <v-col cols="6">
              <minimal-event v-if="event.participants.includes('Fabian')" :event="event"></minimal-event>
            </v-col>
            <v-col cols="6">
              <minimal-event v-if="event.participants.includes('Nadine')" :event="event"></minimal-event>
            </v-col>
          </v-row>
        </v-card>
      </router-link>
    </div>
    <div class="dashboard__chores">
      <card-view cols="2" today minimal></card-view>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import MinimalWeather from './MinimalWeather.vue'
import MinimalEvent from './MinimalEvent.vue'
import CardView from '../chores/CardView.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: { MinimalWeather, MinimalEvent, CardView },
  data () {
    return {
      weather: {}
    }
  },
  async created () {
    const weatherResponse = await fetch('http://api.weatherbit.io/v2.0/forecast/daily?lon=9.4903&lat=47.478&key=cd5ab4e63b284752a69f36765fefb889&lang=de')
    this.weather = (await weatherResponse.json()).data[0]

    this.updateEvents()
    this.getAllChores()
    this.updateChores()
  },
  computed: {
    ...mapState(['events']),
    eventsToday() {
      return this.events.filter(event => moment().isBetween(event.start, event.end, 'day', '[]'))
    }
  },
  methods: {
    ...mapActions(['updateEvents', 'updateChores', 'getAllChores'])
  }
}
</script>