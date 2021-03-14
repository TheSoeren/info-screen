<template>
  <div class="chores">
    <add-chore-dialog class="add-chore-dialog"></add-chore-dialog>
    <template v-if="listView">
      <v-btn class="chores-list__button green darken-3 white--text" fab small @click="listView = false">
        <v-icon>mdi-card-text-outline</v-icon>
      </v-btn>
      <chores-list></chores-list>
    </template>
    <template v-else>
      <v-btn class="chores-view__button green darken-3 white--text" fab small @click="listView = true">
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>
      <card-view class="chores-view--today" today></card-view>
      <card-view class="chores-view--week" :cols="2" secondary this-week></card-view>
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
      listView: false
    }
  },
  async created () {
    this.updateChores()
  },
  methods: {
    ...mapActions(['updateChores'])
  }
}
</script>
