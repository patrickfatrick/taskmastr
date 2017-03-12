import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const isNotProduction = process.env.NODE_ENV !== 'production'
const plugins = []
if (isNotProduction) plugins.push(createLogger())

export default new Vuex.Store({
  strict: isNotProduction,
  plugins: plugins,
  state,
  mutations,
  actions,
  getters
})
