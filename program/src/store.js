import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chores: []
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