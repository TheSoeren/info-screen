<template>
  <div class="chores-view row">
    <div v-if="today"
         v-b-modal.add-chore
         class="chores-view__add col-2"
    >
      <font-awesome-icon icon="plus" size="2x"/>
      <add-chore-modal @add-chore="addChore"></add-chore-modal>
    </div>

    <chore v-for="(chore, index) in relevantChores"
           :key="index"
           :chore="chore"
           :cols="cols"
           :secondary="secondary"
           @delete-chore="deleteChore"
    ></chore>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddChoreModal from './AddChoreModal.vue'
import Chore from './Chore.vue'
import moment from 'moment'

export default {
  name: 'CardView',
  components: { AddChoreModal, Chore },
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
    ...mapState(['chores', 'choresFileHandler']),
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
    }
  },
  methods: {
    ...mapMutations(['deleteFromChores']),
    ...mapActions(['writeToChoresFile']),
    addChore (data) {
      this.chores.push(data)
      this.writeToChoresFile(JSON.stringify(this.chores))
    },
    deleteChore (data) {
      this.deleteFromChores(data)
      this.writeToChoresFile(JSON.stringify(this.chores))
    },
    isChoreToday (chore) {
      const repetition = chore.repetition
      const regularity = chore.repetition.regularity
      let output = false

      if (regularity.value === 'daily') {
        output = true
      } else if (regularity.value === 'weekly') {
        const weekday = moment().day().toString()
        output = repetition.weekdays.includes(weekday)
      } else if (regularity.value === 'bi-weekly') {
        const weekday = moment().day().toString()
        const oddWeek = parseInt(moment().format('W')) % 2
        const weekDayIsToday = repetition.weekdays.includes(weekday)
        const biWeeklyIsThisWeek = repetition.biWeeklyOdd === oddWeek

        output = weekDayIsToday && biWeeklyIsThisWeek
      } else if (regularity.value === 'monthly') {
        const dayOfMonth = moment().date()
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

      if (regularity.value === 'daily' || regularity.value === 'weekly') {
        output = true
      } else if (regularity.value === 'monthly') {
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
