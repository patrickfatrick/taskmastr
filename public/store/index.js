import Vue from 'vue'
import Vuex from 'vuex'
import user from './user-store'
import list from './list-store'
import task from './task-store'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    wiki: '//patrickfatrick.gitbooks.io/taskmastr/content/',
    repo: '//github.com/patrickfatrick/taskmastr',
    testUser: 'mrormrstestperson@taskmastr.co',
    testKey: 'S41iVAtINGREsIdUE-278',
    deleteQueue: {}
  },
  modules: {
    user,
    list,
    task
  }
})
