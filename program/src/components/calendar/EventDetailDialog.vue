<template>
  <v-dialog :value="show" @click:outside="close">
    <v-card v-if="event">
      <v-card-title>
        {{ event.title }}
        <v-spacer></v-spacer>
        <v-btn text icon @click.stop="deleteEvent">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">Start:</v-col>
          <v-col cols="9">{{ formatDate(event.start) }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="3">Ende:</v-col>
          <v-col cols="9">{{ formatDate(event.end) }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="3">Inhalt:</v-col>
          <v-col cols="9" v-html="event.content"></v-col>
        </v-row>
        <v-row>
          <v-col cols="3">Personen:</v-col>
          <v-col cols="9">{{ event.participants.join(', ') }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-1" text @click="close()">
          Schliessen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: "EventDetailDialog",
  props: {
    show: {
      type: Boolean
    },
    event: {
      type: Object
    }
  },
  methods: {
    ...mapActions(['removeFromEvents']),
    formatDate (date) {
      let formatting = 'DD. MMM yyyy HH:mm'
      if (this.event.allDay) {
        formatting = 'DD. MMM yyyy'
      }
      return moment(date).locale('de').format(formatting)
    },
    close () {
      this.$emit('close')
    },
    deleteEvent () {
      this.removeFromEvents(this.event.id)
      this.close()
    }
  }
}
</script>
