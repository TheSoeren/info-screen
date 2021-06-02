import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import IdleVue from "idle-vue";

import './styles/_index.scss'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)

import store from './plugins/store.js'
import router from './plugins/router.js'
import vuetify from './plugins/vuetify.js';
import App from './App.vue'

const eventsHub = new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
})

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 300000,
  startAtIdle: false
})
