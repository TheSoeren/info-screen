<template>
  <div class="chores">
    <a @click="importFileContent"
       class="chores__import">
      Daten importieren
    </a>
    <card-view class="chores-view--today" @import-file="importFileContent" today></card-view>
    <card-view class="chores-view--week" :cols="2" secondary thisWeek></card-view>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import CardView from './CardView.vue'

export default {
  name: 'Chores',
  components: { CardView },
  methods: {
    ...mapMutations(['setChoresFileHandler']),
    ...mapActions(['updateChores']),
    async importFileContent () {
      try {
        const [file_ref] = await window.showOpenFilePicker({multiple: false})
        this.setChoresFileHandler(file_ref)
        this.updateChores()
      } catch (e) {
        console.log(`${e} No File selected!`)
      }
    }
  }
}
</script>
