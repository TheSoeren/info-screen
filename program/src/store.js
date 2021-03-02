import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    choresFileHandler: null,
    chores: []
  },
  mutations: {
    setChoresFileHandler (state, fileHandler) {
      state.choresFileHandler = fileHandler
    },
    deleteFromChores (state, data) {
      state.chores = state.chores.filter(chore => chore !== data)
    }
  },
  actions: {
    async updateChores (context) {
      const file = await context.state.choresFileHandler.getFile()
      const content = await file.text()
      context.state.chores = JSON.parse(content)
    },
    async writeToChoresFile (context, jsonData) {
      const writableStream = await context.state.choresFileHandler.createWritable()
      await writableStream.write(jsonData)
      await writableStream.close()
      context.dispatch('updateChores')
    }
  }
})