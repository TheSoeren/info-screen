<template>
  <b-modal id="add-chore"
           title="Eintrag erfassen"
           class="add-chores-modal"
           :disabled="!$v.$invalid"
           hide-footer
           @ok="$emit('add-chore', choreData)"
           @hide="resetForm"
  >
    <b-form-group label="Bezeichnung">
      <b-form-input v-model="$v.name.$model"></b-form-input>
    </b-form-group>

    <b-form-group label="Wiederholung">
      <multiselect v-model="$v.repetition.$model.regularity"
                   :options="regularityOptions"
                   track-by="value"
                   label="label"
      ></multiselect>
    </b-form-group>
    
    <b-form-group v-if="repetition.regularity.value === 'weekly' || repetition.regularity.value === 'bi-weekly'">
      <b-form-checkbox-group v-model="$v.repetition.$model.weekdays"
                            :options="weeklyOptions"
                            class="add-chores-modal__weekly"
      ></b-form-checkbox-group>
    </b-form-group>

    <b-form-group v-if="repetition.regularity.value === 'monthly'">
      <b-form-checkbox-group v-model="$v.repetition.$model.daysOfMonth"
                            :options="monthlyOptions"
                            class="add-chores-modal__monthly"
      ></b-form-checkbox-group>
    </b-form-group>
    
    <!-- label needs to be extern because of a bug when closing the select by clicking outside -->
    <b-form-group>
      <label>Icon</label>
      <icon-picker :options="choresIcons" @icon-changed="$v.icon.$model = $event"></icon-picker>
    </b-form-group>
    
    <b-form-group label="Verantwortlich">
      <multiselect v-model="$v.responsible.$model"
                   :options="householdMembers"
                   multiple
      ></multiselect>
    </b-form-group>
    
    <b-form-group label="Zusätzliche Angaben">
      <b-form-input v-model="details"></b-form-input>
    </b-form-group>
    
    <b-button class="mt-3" variant="danger" block @click="hideModal">Abbrechen</b-button>
    <b-button class="mt-2" variant="success" :disabled="$v.$invalid" block @click="submitForm">Erstellen</b-button>
  </b-modal>
</template>
<script>
import regularityOptions from '../../js/data/chores/regularityOptions.js'
import weeklyOptions from '../../js/data/chores/weeklyOptions.js'
import monthlyOptions from '../../js/data/chores/monthlyOptions.js'
import choresIcons from '../../js/data/chores/choresIcons'
import householdMembers from '../../js/data/chores/householdMembers.js'
import IconPicker from '../IconPicker.vue'
import { required } from 'vuelidate/lib/validators';
import moment from 'moment'

export default {
  name: 'AddChoreModal',
  components: { IconPicker },
  data () {
    return {
      regularityOptions,
      weeklyOptions,
      monthlyOptions,
      choresIcons,
      householdMembers,

      id: '',
      name: '',
      repetition: {
        regularity: 'weekly',
        weekdays: [],
        daysOfMonth: []
      },
      icon: '',
      responsible: '',
      details: ''
    }
  },
  validations: {
    name: { required },
    repetition: { required },
    icon: { required },
    responsible: { required }
  },
  computed: {
    choreData () {
      return {
        id: this.id,
        name: this.name,
        repetition: this.repetition,
        icon: this.icon,
        responsible: this.responsible,
        details: this.details
      }
    },
    weekOfYear () {
      return parseInt(moment().format('W'))
    }
  },
  methods: {
    resetForm () {
      this.name = ''
      this.repetition = {
        regularity: 'weekly',
        weekdays: [],
        biWeeklyOdd: true,
        daysOfMonth: []
      }
      this.icon = ''
      this.responsible = ''
      this.details = ''

      this.$nextTick(() => {
        this.$v.$reset()
      });
    },
    hideModal () {
      this.$bvModal.hide('add-chore')
    },
    submitForm () {
      this.id = moment().format('MMDDYYYYHHmmss')
      this.repetition.biWeeklyOdd = this.weekOfYear % 2

      this.$v.$reset()
      this.$emit('add-chore', this.choreData)
      this.$bvModal.hide('add-chore')
    }
  }
}
</script>
