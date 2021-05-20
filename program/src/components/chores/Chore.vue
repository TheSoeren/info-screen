<template>
  <v-card :class="['chores-card rounded-sm', { 'chores-card--secondary': secondary }]"
          :style="[{ 'background-color': backgroundColor }]"
          elevation="5"
          @click="toggleDone(choreIndex)"
  >
    <v-overlay v-if="!secondary" :value="chore.done" absolute>
      <v-icon class="chores-card__check" :style="[{ 'color': backgroundColor }]">mdi-check</v-icon>
    </v-overlay>
    <div :class="['chores-card__content', { 'chores-card__content--done': chore.done }]">
      <div class="chores-card__image-container">
        <v-img :src="chore.icon.image" alt="test" contain></v-img>
      </div>
      <div class="chores-card__name">{{ chore.name }}</div>
      <div class="chores-card__details">{{ chore.details }}</div>
      <div class="chores-card__responsible">{{ chore.responsible.join(', ') }}</div>
    </div>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Chore',
  props: {
    chore: {
      type: Object,
      required: true
    },
    choreIndex: {
      type: Number,
      required: true
    },
    secondary: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      backgroundColor: `hsl(${Math.random() * 360}, 50%, 60%)`
    }
  },
  methods: {
    ...mapActions(['toggleDone'])
  }
}
</script>