import VueRouter from 'vue-router';
import Home from './components/Home.vue'
import Chores from './components/chores/index.vue'

let routes=[
  { path: '/', component: Home },
  { path: '/chores', component: Chores }
];

export default new VueRouter({
  routes,
  mode: 'history'
});