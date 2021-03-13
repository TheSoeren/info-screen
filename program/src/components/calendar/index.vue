<template>
  <div class="calendar">
    <full-calendar :options="calendarOptions"></full-calendar>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'Calendar',
  components: { FullCalendar },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        weekends: true
      }
    }
  }
}
</script>
