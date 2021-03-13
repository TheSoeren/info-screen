import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chores: [{"id":"1","name":"Kompost leeren","repetition":{"regularity":{"value":"weekly","label":"Täglich"},"weekdays":[],"weekOfYear":1,"daysOfMonth":[]},"icon":{"value":"compost","label":"Kompost","image":"/img/compost.64e9beeb.svg"},"responsible":["Nadine","Fabian"],"details":"Am Abend nach dem Essen"},{"id":"03092021194931","name":"test","repetition":{"regularity":{"value":"daily","label":"Täglich"},"weekdays":[],"weekOfYear":0,"daysOfMonth":[]},"icon":{"value":"car wash","label":"Auto waschen","image":"/img/car_wash.c7c6bfe6.svg"},"responsible":["Nadine"],"details":"Am Abend nach dem Essen"},{"id":"03092021194931","name":"test","repetition":{"regularity":{"value":"daily","label":"Täglich"},"weekdays":[],"weekOfYear":0,"daysOfMonth":[]},"icon":{"value":"broom","label":"Besen","image":"/img/broom.1151b1ef.svg"},"responsible":["Fabian"],"details":""}]
  },
  actions: {
    async updateChores (context) {
      const response = await fetch('http://localhost:8000/chores')
      context.state.chores = await response.json()
    },
    async addToChores (context, jsonData) {
      await fetch('http://localhost:8000/chores', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      context.dispatch('updateChores')
    },
    async removeFromChores (context, id) {
      await fetch(`http://localhost:8000/chores/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      context.dispatch('updateChores')
    }
  }
})