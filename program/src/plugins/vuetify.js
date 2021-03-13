import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework'
import variables from '../styles/_variables.scss'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: variables.primary,
        secondary: variables.secondary,
        accent: variables.accent
      },
    },
  }
});
