<template>
  <v-card :class="['chores-card rounded-sm', { 'chores-card--secondary': secondary }]"
          :style="[{ 'background-color': backgroundColor }]"
          elevation="5"
          @click="toggleDone"
  >
    <v-overlay :value="done" absolute @click="toggleDone">
      <v-icon class="chores-card__check" :style="[{ 'color': backgroundColor }]">mdi-check</v-icon>
    </v-overlay>
    <div :class="['chores-card__content', { 'chores-card__content--done': done }]">
      <v-btn class="chores-card__delete" absolute text icon @click.stop="removeFromChores(chore.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <div class="chores-card__image-container">
        <v-img :src="chore.icon.image" alt="test" contain></v-img>
      </div>
      <div class="chores-card__name">{{ chore.name }}</div>
      <template v-if="!secondary">
        <div class="chores-card__details">{{ chore.details }}</div>
      </template>
      <div class="chores-card__responsible">{{ chore.responsible.join(', ') }}</div>
    </div>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: "Chore",
  props: {
    chore: {
      type: Object,
      required: true
    },
    cols: {
      type: Number,
      default: 3
    },
    secondary: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      done: false,
      backgroundColor: `hsl(${Math.random() * 360}, 50%, 60%)`
    }
  },
  methods: {
    ...mapActions(['removeFromChores']),
    toggleDone () {
      this.done = !this.done
    }
  }
}
</script>