import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'
import { isProduction } from '../helper-utilities/utils'

Vue.use(Vuex)

const plugins = []
if (!isProduction()) plugins.push(createLogger())

export default new Vuex.Store({
  strict: !isProduction(),
  plugins: plugins,
  state,
  mutations,
  actions,
  getters
})
