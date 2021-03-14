<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
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
            <v-col>
              <v-text-field label="Bezeichnung *"
                            v-model="chore.name"
                            :rules="rules.name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select label="Wiederholung *"
                        item-text="label"
                        item-value="value"
                        v-model="chore.repetition.regularity"
                        :items="regularityOptions"
                        :rules="rules.regularity"
              ></v-select>
              <v-item-group v-if="chore.repetition.regularity === 'weekly' || chore.repetition.regularity === 'bi-weekly'" class="add-chore-dialog__weekly">
                <v-checkbox v-for="(weeklyOption, index) in weeklyOptions"
                            :key="index"
                            v-model="chore.repetition.weekdays"
                            :value="weeklyOption.value" 
                            :label="weeklyOption.label"
                            multiple
                ></v-checkbox>
              </v-item-group>
              <v-item-group v-if="chore.repetition.regularity === 'monthly'" class="add-chore-dialog__monthly">
                <v-checkbox v-for="(monthlyOption, index) in monthlyOptions"
                            :key="index" class="add-chore-dialog__monthly-value"
                            v-model="chore.repetition.daysOfMonth"
                            :value="monthlyOption"
                            :label="monthlyOption"
                            multiple
                ></v-checkbox>
              </v-item-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete label="Icon *"
                              item-text="label"
                              height="40px"
                              v-model="chore.icon"
                              :items="choresIcons"
                              :rules="rules.icon"
                              return-object
                              hide-selected
              >
                <template slot="selection" slot-scope="{ item }">
                  <icon-picker-template :item="item" chips/>
                </template>
                <template slot="item" slot-scope="{ item }">
                  <icon-picker-template :item="item"/>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete label="Verantwortlich *"
                              v-model="chore.responsible"
                              :items="householdMembers"
                              :rules="rules.responsible"
                              :search-input.sync="searchInput"
                              hide-selected
                              multiple
                              chips
                              @input="searchInput=null"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Zusätzliche Angaben" v-model="chore.details"/>
            </v-col>
          </v-row>
        </v-form>
        <small>* Pflichtfeld</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="grey lighten-1" text @click="close">
          Abbrechen
        </v-btn>
        <v-btn color="green darken-1" text @click="validate">
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import regularityOptions from '../../js/data/chores/regularityOptions.js'
import weeklyOptions from '../../js/data/chores/weeklyOptions.js'
import monthlyOptions from '../../js/data/chores/monthlyOptions.js'
import choresIcons from '../../js/data/chores/choresIcons'
import householdMembers from '../../js/data/householdMembers.js'
import IconPickerTemplate from './IconPickerTemplate'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'AddChoreDialog',
  components: { IconPickerTemplate },
  data () {
    return {
      regularityOptions,
      weeklyOptions,
      monthlyOptions,
      choresIcons,
      householdMembers,

      dialog: false,
      valid: true,
      searchInput: null,
      chore: {
        id: '',
        name: '',
        repetition: {
          regularity: '',
          weekdays: [],
          weekOfYear: 0,
          daysOfMonth : []
        },
        icon: {},
        responsible: [],
        details: '',
      },
      rules: {
        name: [ v => !!v || 'Bezeichnung ist Erforderlich' ],
        regularity: [ v => !!v || 'Wiederholung ist Erforderlich' ],
        icon: [ v => v && !!Object.keys(v).length|| 'Icon ist Erforderlich' ],
        responsible: [ v => v && v.length > 0 || 'Verantwortlich ist Erforderlich' ]
      }
    }
  },
  methods: {
    ...mapActions(['addToChores']),
    close () {
      this.$refs.form.reset()
      this.dialog = false
    },
    validate () {
      this.$refs.form.validate()

      this.$nextTick(() => {
        if (this.valid) {
          this.chore.id = moment().format('MMDDYYYYHHmmss')
          this.chore.repetition.weekOfYear = moment().format('W') % 2

          this.addToChores(JSON.stringify(this.chore))
          this.dialog = false
          this.$refs.form.reset()
        }
      })
    }
  }
}
</script>
