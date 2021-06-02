<template>
  <v-app class="info-screen">
    <v-overlay :value="isIdle" :opacity="opacityByDaytime"></v-overlay>
    <v-app-bar v-if="!isIdle" class="app-bar primary" height="70px" app>
      <v-btn class="app-bar__app secondary" elevation="2" fab to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-divider vertical dark></v-divider>
      <v-btn class="app-bar__app secondary" elevation="2" fab to="/chores">
        <v-icon>mdi-format-list-checks</v-icon>
      </v-btn>
      <v-btn class="app-bar__app secondary" elevation="2" fab to="/calendar">
        <v-icon>mdi-calendar-range</v-icon>
      </v-btn>
      <v-btn class="app-bar__app secondary" elevation="2" fab to="/weather">
        <v-icon>mdi-weather-partly-cloudy</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="app-detail">
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
import moment from 'moment'

export default {
  name: 'App',
  data () {
    return {
      showAppBar: true
    }
  },
  created () {
    moment.locale('de')
  },
  computed: {
    isIdle () {
      const idleVue = this.$store.state.idleVue
      return idleVue ? idleVue.isIdle : false
    },
    opacityByDaytime () {
      const now = moment().hour()
      if (now > 23 || now < 8) {
        return '0.9'
      }
      return '0.5'
    }
  },
  watch: {
    isIdle: {
      handler: function (newVal) {
        if (newVal && this.$router.history.current.path !== '/') {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>
