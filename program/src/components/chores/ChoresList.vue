<template>
  <v-expansion-panels class="chores-list" focusable accordion>
    <v-expansion-panel v-for="(chore, index) in allChores"
                       :key="index"
                       elevation="5"
                       class="chores-list__card"
                       :style="[{ 'background-color': getBackgroundColor() }]"
    >
      <v-expansion-panel-header expand-icon="" v-slot="{ open }">
        <div class="chores-list__header-left">
          <div class="chores-list__image-container">
            <v-img :src="chore.icon.image" class="chores-list__image" contain></v-img>
          </div>
          <div class="chores-list__name">{{ chore.name }}</div>
        </div>
        <div class="chores-list__header-right">
          <div class="chores-list__responsible">{{ chore.responsible.join(', ') }}</div>
          <v-btn v-if="open" class="chores-list__delete" text icon @click.stop="removeFromChores(chore.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="chores-list__content">
          <div>Id: {{ chore.id }}</div>
          <div>Repetition: {{ chore.repetition.regularity }}</div>
          <div v-if="chore.repetition.regularity === 'weekly' || chore.repetition.regularity === 'bi-weekly'">
            Weekdays: {{ transformWeekdays(chore.repetition.weekdays).join(', ') }}
          </div>
          <div v-if="chore.repetition.regularity === 'bi-weekly'">
            Woche: {{ chore.repetition.biWeeklyOdd }} (gerade/ungerade Woche im Jahr)
          </div>
          <div v-if="chore.repetition.regularity === 'monthly'">
            Days of Month: {{ chore.repetition.daysOfMonth.join(', ') }}
          </div>
          <div>Icon: {{ chore.icon.label }}</div>
          <div>Verantwortlich: {{ chore.responsible.join(', ') }}</div>
          <div>Details: {{ chore.details }}</div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import weeklyOptions from '../../js/data/chores/weeklyOptions.js'

export default {
  name: 'ChoresList',
  data () {
    return {
      weeklyOptions
    }
  },
  computed: {
    ...mapState(['allChores'])
  },
  methods: {
    ...mapActions(['removeFromChores']),
    getBackgroundColor () {
      return `hsl(${Math.random() * 360}, 50%, 60%)`
    },
    transformWeekdays (weekdays) {
      return weekdays.map(weekday => this.weeklyOptions.find(option => option.value === weekday).label)
    }
  }
}
</script>
