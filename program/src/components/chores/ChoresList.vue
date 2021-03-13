<template>
  <div class="chores-list">
    <v-card v-for="(chore, index) in chores"
            :key="index"
            elevation="5"
            class="chores-list__card"
            :style="[{ 'background-color': getBackgroundColor() }]"
    >
      <div class="chores-list__image-container">
        <v-img :src="chore.icon.image" class="chores-list__image" contain></v-img>
      </div>
      <div>{{ chore.name }}</div>
      <div class="chores-list__responsible">{{ chore.responsible.join(', ') }}</div>
      <v-btn class="chores-list__delete" text icon @click.stop="removeFromChores(chore.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ChoresList',
  computed: {
    ...mapState(['chores'])
  },
  methods: {
    ...mapActions(['removeFromChores']),
    getBackgroundColor () {
      return `hsl(${Math.random() * 360}, 50%, 60%)`
    }
  }
}
</script>
