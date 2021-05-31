<template>
  <div :class="['minimal-event', event.class]">
    <div class="minimal-event__title">{{ event.title }}</div>
    <div v-if="!event.allDay" class="minimal-event__time">
      {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'MinimalEvent',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatTime (datetime) {
      return moment(datetime).format('HH:mm')
    }
  }
}
</script>
