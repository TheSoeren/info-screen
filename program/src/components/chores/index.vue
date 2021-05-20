<template>
  <div class="chores">
    <add-chore-dialog class="add-chore-dialog"></add-chore-dialog>
    <template v-if="listView">
      <v-btn class="chores-list__button-card green darken-3 white--text" fab small @click="listView = false">
        <v-icon>mdi-card-text-outline</v-icon>
      </v-btn>
      <chores-list></chores-list>
    </template>
    <template v-else>
      <v-btn class="chores-view__button-list green darken-3 white--text" fab small @click="listView = true">
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
      <template v-if="!breakpointMd">
        <card-view class="chores-view--primary" today></card-view>
        <card-view class="chores-view--secondary" :cols="2" secondary this-week></card-view>
      </template>
      <template v-else>
        <v-btn class="chores-view__button-weekly green darken-3 white--text" fab small @click="showToday = !showToday">
          <v-icon v-if="showToday">mdi-calendar-week</v-icon>
          <v-icon v-else>mdi-calendar-today</v-icon>
        </v-btn>
        <card-view v-if="showToday" class="chores-view--primary" today></card-view>
        <card-view v-else class="chores-view--primary" secondary this-week></card-view>
      </template>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CardView from './CardView.vue'
import ChoresList from './ChoresList.vue'
import AddChoreDialog from './AddChoreDialog.vue'


export default {
  name: 'Chores',
  components: { AddChoreDialog, CardView, ChoresList },
  data () {
    return {
      listView: false,
      showToday: true
    }
  },
  computed: {
    breakpointMd () {
      return this.$vuetify.breakpoint.width <= 768
    }
  },
  async created () {
    this.getAllChores()
    this.updateChores()
  },
  methods: {
    ...mapActions(['updateChores', 'getAllChores'])
  }
}
</script>
