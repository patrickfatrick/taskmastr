import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      username: '',
      key: '',
      confirm: '',
      resetKey: '',
      resetConfirmKey: '',
      darkmode: false,
      tasks: [],
      current: {
        items: []
      }
    },
    wiki: '//patrickfatrick.gitbooks.io/taskmastr/content/',
    repo: '//github.com/patrickfatrick/taskmastr',
    init: false,
    auth: false,
    forgot: false,
    create: false,
    reset: false,
    rememberMe: false,
    invalidKey: false,
    loginAttempt: false,
    createFail: '',
    forgotAttempt: false,
    forgotEmail: false,
    forgotFail: '',
    confirmAttempt: false,
    resetToken: null,
    resetAttempt: false,
    resetFail: '',
    menuToggled: false,
    saveButton: false,
    deleteAgendas: [],
    deleteQueue: {},
    taskAttempt: false,
    listAttempt: false,
    newList: '',
    newTask: '',
    placeholder: '',
    testUser: 'mrormrstestperson@taskmastr.co',
    testKey: 'S41iVAtINGREsIdUE-278'
  },
  mutations: mutations,
  actions: actions
})
