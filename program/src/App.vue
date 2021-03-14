<template>
  <v-app class="info-screen">
    <v-app-bar class="app-bar primary" height="70px" app>
      <v-btn class="app-bar__app secondary" elevation="2" fab to="/">
      </v-btn>
      <v-divider vertical dark></v-divider>
      <v-btn class="app-bar__app secondary" elevation="2" fab to="/chores">
        <v-icon>mdi-format-list-checks</v-icon>
      </v-btn>
      <v-btn class="app-bar__app secondary" elevation="2" fab to="/calendar">
        <v-icon>mdi-calendar-range</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="app-detail">
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'App'
}
</script>
