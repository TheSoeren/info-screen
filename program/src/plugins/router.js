import VueRouter from 'vue-router';
import Home from '../components/Home.vue'
import Chores from '../components/chores/index.vue'
import Calendar from '../components/calendar/index.vue'

let routes=[
  { path: '/', component: Home },
  { path: '/chores', component: Chores },
  { path: '/calendar', component: Calendar }
];

export default new VueRouter({ routes });