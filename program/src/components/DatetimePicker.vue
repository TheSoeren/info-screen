<template>
  <v-dialog v-model="display" :width="dialogWidth">
    <template v-slot:activator="{ on }">
      <v-text-field v-on="on"
                    :disabled="disabled"
                    :loading="loading"
                    :label="label"
                    :value="formattedDatetime"
                    v-bind="textFieldProps"
                    readonly
      >
        <template v-slot:progress>
          <slot name="progress">
            <v-progress-linear color="primary" indeterminate absolute height="2"></v-progress-linear>
          </slot>
        </template>
      </v-text-field>
    </template>

    <v-card>
      <v-card-text class="px-0 py-0">
        <v-tabs fixed-tabs v-model="activeTab">
          <v-tab key="calendar">
            <slot name="dateIcon">
              <v-icon>mdi-calendar</v-icon>
            </slot>
          </v-tab>
          <v-tab v-if="!disableTime" key="timer" :disabled="dateSelected">
            <slot name="timeIcon">
              <v-icon>mdi-clock-outline</v-icon>
            </slot>
          </v-tab>
          <v-tab-item key="calendar">
            <v-date-picker v-model="date"
                           v-bind="datePickerProps"
                           full-width
                           no-title
                           @input="!disableTime ? showTimePicker() : okHandler()"
            ></v-date-picker>
          </v-tab-item>
          <v-tab-item v-if="!disableTime" key="timer">
            <v-time-picker ref="timer"
                           class="v-time-picker-custom"
                           v-model="time"
                           v-bind="timePickerProps"
                           full-width
                           no-title
                           @click:minute="okHandler"
            ></v-time-picker>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions" :parent="this">
          <v-btn color="grey lighten-1" text @click.native="clearHandler">{{ clearText }}</v-btn>
          <v-btn color="green darken-1" text @click="okHandler">{{ okText }}</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
const DEFAULT_DATE = ''
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DATE_FORMAT = 'yyyy-MM-DD'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
const DEFAULT_DIALOG_WIDTH = 340
const DEFAULT_CLEAR_TEXT = 'CLEAR'
const DEFAULT_OK_TEXT = 'OK'

export default {
  name: 'v-datetime-picker',
  model: {
    prop: 'datetime',
    event: 'input'
  },
  props: {
    datetime: {
      type: [Date, String],
      default: null
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    },
    dialogWidth: {
      type: Number,
      default: DEFAULT_DIALOG_WIDTH
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT
    },
    timeFormat: {
      type: String,
      default: DEFAULT_TIME_FORMAT
    },
    clearText: {
      type: String,
      default: DEFAULT_CLEAR_TEXT
    },
    okText: {
      type: String,
      default: DEFAULT_OK_TEXT
    },
    textFieldProps: {
      type: Object
    },
    datePickerProps: {
      type: Object
    },
    timePickerProps: {
      type: Object
    },
    disableTime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      display: false,
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    dateTimeFormat() {
      return this.dateFormat + ' ' + this.timeFormat
    },
    defaultDateTimeFormat() {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    formattedDatetime() {
      if (this.disableTime) {
        return this.selectedDate ? moment(this.selectedDatetime).locale('de').format(this.dateFormat) : ''
      }
      return this.selectedDatetime ? moment(this.selectedDatetime).locale('de').format(this.dateTimeFormat) : ''
    },
    selectedDate() {
      if (this.date) {
        return moment(this.date).format(DEFAULT_DATE_FORMAT)
      }
      return null
    },
    selectedDatetime() {
      if (this.date && this.time) {
        let datetimeString = this.date + ' ' + this.time
        if (this.time.length === 5) {
          datetimeString += ':00'
        }
        return moment(datetimeString).format(this.defaultDateTimeFormat)
      }
      return null
    },
    dateSelected() {
      return !this.date
    }
  },
  methods: {
    init() {
      if (!this.datetime) {
        this.date = null
        this.time = null
        return
      }
      let initDateTime
      if (this.datetime instanceof Date) {
        initDateTime = this.datetime
      } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
        // see https://stackoverflow.com/a/9436948
        initDateTime = moment(this.datetime).format(this.defaultDateTimeFormat)
      }
      this.date = moment(initDateTime).format(DEFAULT_DATE_FORMAT)
      this.time = moment(initDateTime).format(DEFAULT_TIME_FORMAT)
    },
    okHandler() {
      this.resetPicker()
      this.$emit('input', this.disableTime ? this.selectedDate : this.selectedDatetime)
    },
    clearHandler() {
      this.resetPicker()
      this.date = DEFAULT_DATE
      this.time = DEFAULT_TIME
      this.$emit('input', null)
    },
    resetPicker() {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true
      }
    },
    showTimePicker() {
      this.activeTab = 1
    }
  },
  watch: {
    datetime () {
      this.init()
    },
    disableTime () {
      this.okHandler()
    }
  }
}
</script>