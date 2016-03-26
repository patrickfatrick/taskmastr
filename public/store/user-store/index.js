import mutations from './user-mutations'

export default {
  state: {
    user: {
      username: '',
      key: '',
      confirm: '',
      resetKey: '',
      resetConfirmKey: '',
      darkmode: false,
      tasks: []
    },
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
    resetFail: ''
  },
  mutations: mutations
}
