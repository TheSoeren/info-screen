// Dependencies
const fs = require('fs')
const moment = require('moment')
const minimist = require('minimist')(process.argv.slice(2))

let onlyUpdate = false
if (minimist['_'].length > 0 && minimist['_'][0] === 'true') {
  onlyUpdate = true
}

//const PROJECT_PATH = '..'
const PROJECT_PATH = '/home/pi/infoscreen'
const CHORES_FILE_PATH = '/data/chores.json'
const FILTERED_CHORES_FILE_PATH = '/data/filtered_chores.json'

const choresList = JSON.parse(fs.readFileSync(PROJECT_PATH + CHORES_FILE_PATH, 'utf-8'))
let filteredChoresList = JSON.parse(fs.readFileSync(PROJECT_PATH + FILTERED_CHORES_FILE_PATH, 'utf-8'))

if (!onlyUpdate) {
  if (filteredChoresList.length) {
    filteredChoresList = filteredChoresList.filter(chore => !chore.done)
  }
}

function isChoreToday (chore) {
  const repetition = chore.repetition
  const regularity = chore.repetition.regularity
  let output = false

  if (regularity === 'daily') {
    output = true
  } else if (regularity === 'weekly') {
    const weekday = moment().day().toString()
    output = repetition.weekdays.includes(weekday)
  } else if (regularity === 'bi-weekly') {
    const weekday = moment().day().toString()
    const weekDayIsToday = repetition.weekdays.includes(weekday)
    const biWeeklyIsThisWeek = repetition.weekOfYear === moment().format('W') % 2

    output = weekDayIsToday && biWeeklyIsThisWeek
  } else if (regularity === 'monthly') {
    const dayOfMonth = `${moment().date()}`
    output = repetition.daysOfMonth.includes(dayOfMonth)
  }
  return output
}

if (onlyUpdate) {
  choresList.forEach(chore => {
    if (isChoreToday(chore) && !filteredChoresList.find(filteredChore => filteredChore.id === chore.id)) {
      filteredChoresList.push(Object.assign(chore, { done: false }))
    }
  })
} else {
  choresList.forEach(chore => {
    if (isChoreToday(chore)) {
      filteredChoresList.push(Object.assign(chore, { done: false }))
    }
  })
}

fs.writeFileSync(PROJECT_PATH + FILTERED_CHORES_FILE_PATH, JSON.stringify(filteredChoresList))
