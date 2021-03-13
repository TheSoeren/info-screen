import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import './styles/_index.scss'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)

import store from './plugins/store.js'
import router from './plugins/router.js'
import vuetify from './plugins/vuetify.js';
import App from './App.vue'

new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
})
