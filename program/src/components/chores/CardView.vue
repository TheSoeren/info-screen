<template>
  <div class="chores-view">
    <v-col v-for="(chore, index) in relevantChores" :key="index" :cols="cols">
      <chore :chore="chore"
             :cols="cols"
             :secondary="secondary"
      ></chore>
    </v-col>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Chore from './Chore.vue'
import moment from 'moment'

export default {
  name: 'CardView',
  components: { Chore },
  props: {
    today: {
      type: Boolean,
      default: false
    },
    thisWeek: {
      type: Boolean,
      default: false
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
  computed: {
    ...mapState(['chores']),
    relevantChores () {
      if (this.chores.length) {
        if (this.today) {
          return this.chores.filter(chore => {
            return this.isChoreToday(chore)
          })
        } else if (this.thisWeek) {
          return this.chores.filter(chore => {
            return this.isChoreThisWeek(chore) && !this.isChoreToday(chore)
          })
        }
      }
      return this.chores
    },
    currentWeekOfYear () {
      return moment().format('W') % 2
    }
  },
  methods: {
    isChoreToday (chore) {
      const repetition = chore.repetition
      const regularity = chore.repetition.regularity
      let output = false

      if (regularity === 'daily') {
        output = true
      } else if (regularity === 'weekly') {
        const weekday = moment().day().toString()
        output = repetition.weekdays.includes(weekday)
      } else if (regularity === 'bi-weekly') {
        const weekday = moment().day().toString()
        const weekDayIsToday = repetition.weekdays.includes(weekday)
        const biWeeklyIsThisWeek = repetition.weekOfYear === this.currentWeekOfYear

        output = weekDayIsToday && biWeeklyIsThisWeek
      } else if (regularity === 'monthly') {
        const dayOfMonth = `${moment().date()}`
        output = repetition.daysOfMonth.includes(dayOfMonth)
      }
      return output
    },
    isDateThisWeek (date) {
      return date.isBetween(moment().startOf('isoWeek'), moment().endOf('isoWeek'))
    },
    isChoreThisWeek (chore) {
      const repetition = chore.repetition
      const regularity = chore.repetition.regularity
      let output = false

      if (regularity === 'daily' || regularity === 'weekly') {
        output = true
      } else if (regularity === 'bi-weekly') {
        return repetition.weekOfYear === this.currentWeekOfYear
      } else if (regularity === 'monthly') {
        repetition.daysOfMonth.forEach(dayOfMonth => {
          const date = moment().set("date", dayOfMonth)

          if (this.isDateThisWeek(date)) {
            output = true
          }
        })
      }
      return output
    }
  }
}
</script>
