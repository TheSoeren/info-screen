<template>
  <v-dialog v-model="dialog" @click:outside="close">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" class="green darken-3 white--text" fab small>
        <v-icon>mdi-brightness-4</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Eintrag erfassen</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-datetime-picker ref="datePicker"
                               label="Tag *"
                               v-model="event.start"
                               dateFormat="DD. MMM yyyy"
                               :text-field-props="{ prependIcon: 'mdi-calendar' }"
                               :date-picker-props="{ firstDayOfWeek: '1' }"
                               :time-picker-props="{ format: '24hr' }"
                               :disable-time="true"
            ></v-datetime-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="shift in shiftOptions" :key="shift.name">
            <v-btn :disabled="!event.start" @click="createEvent(shift)" fab small>{{ shift.name }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import shiftOptions from '../../js/data/events/shiftOptions.js'
import VDatetimePicker from '../DatetimePicker'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'AddShiftDialog',
  components: { VDatetimePicker },
  data () {
    return {
      shiftOptions,
      dialog: false,
      event: {
        id: '',
        title: '',
        allDay: true,
        start: null,
        end: null,
        content: '',
        participants: [ 'Nadine' ],
        class: 'white--text purple darken-3'
      }
    }
  },
  methods: {
    ...mapActions(['addToEvents']),
    close () {
      this.dialog = false
      this.event = {
        id: '',
        title: '',
        allDay: true,
        start: null,
        end: null,
        content: '',
        participants: [ 'Nadine' ],
        class: 'white--text purple darken-3'
      }
      this.$refs.datePicker.clearHandler()
    },
    createEvent (shift) {
      this.event.id = moment().format('MMDDYYYYHHmmss')
      this.event.title = shift.name
      this.event.content = shift.content
      this.event.end = this.event.start

      this.addToEvents(JSON.stringify(this.event))
      this.close()
    }
  }
}
</script>
