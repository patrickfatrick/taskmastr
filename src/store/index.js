import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [process.env.NODE_ENV !== 'production' && createLogger()],
  state,
  mutations,
  actions,
  getters
})
