<template>
  <v-dialog v-model="dialog" @click:outside="close">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" class="light-green darken-2 white--text" fab small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Eintrag erfassen</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="8">
              <v-text-field label="Bezeichnung *"
                            v-model="event.title"
                            :rules="rules.title"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-checkbox label="Ganztägig" v-model="event.allDay"></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-datetime-picker ref="startPicker"
                                 label="Start *"
                                 v-model="event.start"
                                 dateFormat="DD. MMM yyyy"
                                 :text-field-props="{ prependIcon: 'mdi-calendar', rules: rules.start }"
                                 :date-picker-props="{ firstDayOfWeek: '1' }"
                                 :time-picker-props="{ format: '24hr' }"
                                 :disable-time="event.allDay"
              ></v-datetime-picker>
            </v-col>
            <v-col>
              <v-datetime-picker ref="endPicker"
                                 label="Ende *"
                                 v-model="event.end"
                                 dateFormat="DD. MMM yyyy"
                                 :text-field-props="{ prependIcon: 'mdi-calendar', rules: rules.end  }"
                                 :date-picker-props="{ firstDayOfWeek: '1' }"
                                 :time-picker-props="{ format: '24hr' }"
                                 :disable-time="event.allDay"
              ></v-datetime-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea label="Inhalt **"
                          hint='<i class="v-icon mdi mdi-plus"></i> für MDI Icons'
                          v-model="event.content"
                          auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete label="Personen *"
                              v-model="event.participants"
                              :items="householdMembers"
                              :search-input.sync="searchInput"
                              item-text="name"
                              return-object
                              hide-selected
                              multiple
                              chips
                              clearable
                              @input="searchInput=null"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
        <small>* Pflichtfeld</small>
        <v-divider width="100px"></v-divider>
        <small>** Mit HTML parser</small>
      </v-card-text>
      <v-card-actions>
        <div class="add-event-dialog__action-bar">
          <div>
            <template v-for="shift in shiftOptions">
              <v-btn :key="shift.name" :disabled="!event.start" @click="createShift(shift)" fab small>
                {{ shift.name }}
              </v-btn>
            </template>
          </div>
          <div>
            <v-spacer/>
            <v-btn color="grey lighten-1" text @click="close">
              Abbrechen
            </v-btn>
            <v-btn color="green darken-1" text @click="validate">
              Speichern
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import householdMembers from '../../js/data/householdMembers.js'
import shiftOptions from '../../js/data/events/shiftOptions.js'
import VDatetimePicker from '../DatetimePicker'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'AddEventDialog',
  components: { VDatetimePicker },
  data () {
    return {
      householdMembers,
      shiftOptions,
      dialog: false,
      searchInput: null,
      valid: true,
      event: {
        id: '',
        title: '',
        allDay: false,
        start: null,
        end: null,
        content: '',
        participants: [],
        class: 'white--text'
      },
      rules: {
        title: [ v => !!v || 'Bezeichnung ist Erforderlich' ],
        start: [ v => !!v || 'datum ist Erforderlich' ],
        end: [ v => !!v || 'Enddatum ist Erforderlich' ]
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
        allDay: false,
        start: null,
        end: null,
        content: '',
        participants: [],
        class: 'white--text'
      }
      this.$refs.startPicker.clearHandler()
      this.$refs.endPicker.clearHandler()
      this.$refs.form.resetValidation()
    },
    validate () {
      this.$refs.form.validate()

      this.$nextTick(() => {
        if (this.valid) {
          this.event.id = moment().format('MMDDYYYYHHmmss')
          const participants = this.event.participants
          this.event.participants = participants.map(participant => participant.name)
          if (participants.length > 1) {
            this.event.class += ' teal'
          } else {
            this.event.class += participants[0].class
          }

          this.addToEvents(JSON.stringify(this.event))
          this.close()
        }
      })
    },
    createShift (shift) {
      this.event.id = moment().format('MMDDYYYYHHmmss')
      this.event.title = shift.name
      this.event.allDay = true,
      this.event.start = moment(this.event.start).format('yyyy-MM-DD')
      this.event.end = this.event.start
      this.event.content = shift.content
      this.event.participants = [ 'Nadine' ]
      this.event.class = 'white--text purple darken-3'

      this.addToEvents(JSON.stringify(this.event))
      this.close()
    }
  }
}
</script>
