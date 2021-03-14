<template>
  <div class="calendar">
    <add-event-dialog class="add-event-dialog"></add-event-dialog>
    <event-detail-dialog :show="detailDialog" :event="selectedEvent" @close="detailDialog = false"></event-detail-dialog>
    <v-btn v-if="isWeekView()" class="calendar__button green darken-3 white--text" fab small @click="$refs.vuecal.switchView('month')">
      <v-icon>mdi-calendar-month</v-icon>
    </v-btn>
    <v-btn v-else class="calendar__button green darken-3 white--text" fab small @click="$refs.vuecal.switchView('week')">
      <v-icon>mdi-calendar-week</v-icon>
    </v-btn>
    <div class="calendar__main">
      <vue-cal ref="vuecal"
               :events="events"
               :disable-views="disabledViews"
               :on-event-click="openDetailDialog"
               show-all-day-events="short"
               events-on-month-view="short"
               active-view="week"
               locale="de"
               @view-change="highlightNow"
      ></vue-cal>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/de.js'
import AddEventDialog from './AddEventDialog.vue'
import EventDetailDialog from './EventDetailDialog.vue'

export default {
  name: 'Calendar',
  components: { VueCal, AddEventDialog, EventDetailDialog },
  data() {
    return {
      disabledViews: ['years', 'year', 'day'],
      detailDialog: false,
      selectedEvent: null
    }
  },
  created () {
    this.updateEvents()
  },
  mounted () {
    this.highlightNow()
  },
  computed: {
    ...mapState(['events']),
  },
  methods: {
    log(thing) {
      console.log(thing)
    },
    ...mapActions(['updateEvents']),
    isWeekView () {
      return this.$refs.vuecal?.view.id === 'week'
    },
    highlightNow () {
      if (this.isWeekView()) {
        this.$nextTick(() => {
          const nowLine = document.querySelector('.vuecal__now-line')
          if (nowLine) {
            nowLine.scrollIntoView()
          }
        })
      }
    },
    openDetailDialog (event) {
      this.selectedEvent = event
      this.detailDialog = true
    }
  }
}
</script>
