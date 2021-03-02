<template>
  <div :class="[`chores-card col-${cols}`, { 'chores-card--secondary': secondary }]"
        :style="[{ 'background-color': backgroundColor }]"
        @click="toggleDone"
  >
    <div v-if="done" class="chores-card__done">
      <font-awesome-icon icon="check" :style="{ 'color': backgroundColor }"/>
    </div>
    <div v-else class="chores-card__delete" @click.stop="$emit('delete-chore')">
      <font-awesome-icon icon="trash" class="ml-auto"/>
    </div>
    <div class="chores-card__content">
      <div class="chores-card__image-container">
        <img :src="chore.icon.image" alt="test" class="chores-card__image">
      </div>
      <div class="chores-card__name">{{ chore.name }}</div>
      <template v-if="!secondary">
        <div class="chores-card__details">{{ chore.details }}</div>
        <div class="chores-card__responsible">{{ chore.responsible.join(', ') }}</div>
      </template>
    </div>
  </div>
</template>
<script>
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
      default: false
    }
  },
  data () {
    return {
      done: false,
      backgroundColor: this.getRandomColor()
    }
  },
  methods: {
    getRandomColor () {
      return `hsl(${Math.random() * 360}, 50%, 60%)`
    },
    toggleDone () {
      this.done = !this.done
    }
  }
}
</script>