import VueRouter from 'vue-router';
import Home from '../components/dashboard/index.vue'
import Chores from '../components/chores/index.vue'
import Calendar from '../components/calendar/index.vue'
import Weather from '../components/weather/index.vue'

let routes=[
  { path: '/', component: Home },
  { path: '/chores', component: Chores },
  { path: '/calendar', component: Calendar },
  { path: '/weather', component: Weather }
];

export default new VueRouter({ routes });