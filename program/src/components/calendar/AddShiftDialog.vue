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
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('S1')" fab small>S1</v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('FD')" fab small>FD</v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('G')" fab small>G</v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('MG')" fab small>MG</v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('MD')" fab small>MD</v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('SD')" fab small>SD</v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('LN')" fab small>LN</v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!event.start" @click="createEvent('LB')" fab small>LB</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import VDatetimePicker from '../DatetimePicker'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'AddShiftDialog',
  components: { VDatetimePicker },
  data () {
    return {
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
      this.$refs.datePicker.clearHandler()
    },
    createEvent (shift) {
      this.event.id = moment().format('MMDDYYYYHHmmss')
      this.event.title = shift
      this.event.end = this.event.start

      switch (shift) {
        case 'S1':
          this.event.content = '07:00 - 15:54'
          break
        case 'FD':
          this.event.content = '07:00 - 15:54'
          break
        case 'G':
          this.event.content = '07:00 - 12:30, 16:00 - 18:54'
          break
        case 'MG':
          this.event.content = '09:00 - 12:30, 17:00 - 21:00'
          break
        case 'MD':
          this.event.content = '12:06 - 21:00'
          break
        case 'SD':
          this.event.content = '13:36 - 22:30'
          break
        case 'LN':
          this.event.content = '07:00 - 15:54'
          break
        case 'LB':
          this.event.content = '07:00 - 15:54'
          break
      }

      this.addToEvents(JSON.stringify(this.event))
      this.close()
    }
  }
}
</script>
