<template>
  <div class="chores">
    <card-view class="chores-view--today" today></card-view>
    <card-view class="chores-view--week" :cols="2" secondary thisWeek></card-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CardView from './CardView.vue'

export default {
  name: 'Chores',
  components: { CardView },
  async created () {
    this.updateChores()
  },
  methods: {
    ...mapActions(['updateChores'])
  }
}
</script>
