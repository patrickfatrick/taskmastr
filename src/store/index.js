import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'
import { isDevelopment } from '../helper-utilities/utils'

Vue.use(Vuex)

const plugins = []
if (isDevelopment()) plugins.push(createLogger())

export default new Vuex.Store({
  strict: isDevelopment(),
  plugins: plugins,
  state,
  mutations,
  actions,
  getters
})
