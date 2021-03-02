import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import vSelect from "vue-select"
import Multiselect from 'vue-multiselect'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './scss/_custom.scss'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)

import store from './store.js'
import router from './router.js'
import App from './App.vue'

library.add(faPlus, faCheck, faTrash)
library.add()

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("v-select", vSelect);
Vue.component('multiselect', Multiselect)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
