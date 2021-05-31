<template>
  <v-card class="minimal-chore" elevation="4" color="rgb(255, 255, 255, 0.3)">
    <v-img class="minimal-chore__image" :src="chore.icon.image" :alt="chore.icon.value" contain></v-img>
    <div class="minimal-chore__name">{{ chore.name }}</div>
    <div class="minimal-chore__responsible">{{ chore.responsible.join(', ') }}</div>
  </v-card>
</template>
<script>
export default {
  name: 'MinimalChore',
  props: {
    chore: {
      type: Object,
      required: true
    }
  }
}
</script>
