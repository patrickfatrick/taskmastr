import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import placeholders from '../helper-utilities/placeholders'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      key: '',
      confirm: '',
      resetKey: '',
      resetConfirmKey: '',
      darkmode: false,
      tasks: [],
      current: {}
    },
    wiki: '//patrickfatrick.gitbooks.io/taskmastr/content/',
    init: false,
    auth: false,
    forgot: false,
    create: false,
    reset: false,
    rememberMe: false,
    invalidKey: false,
    loginAttempt: false,
    forgotAttempt: false,
    forgotEmail: false,
    forgotFail: false,
    confirmAttempt: false,
    resetToken: null,
    resetAttempt: false,
    resetFail: false,
    menuToggled: false,
    saveButton: false,
    deleteAgendas: [],
    deleteQueue: {},
    placeholder: placeholders.placeholders[Math.floor(Math.random() * placeholders.placeholders.length)]
  },
  mutations: mutations,
  actions: actions
})
