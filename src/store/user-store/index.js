export default {
  user: {
    username: '',
    key: '',
    confirmKey: '',
    resetKey: '',
    resetConfirmKey: '',
    darkmode: window.localStorage.hasOwnProperty('darkmode')
    ? window.localStorage.getItem('darkmode') === 'true'
    : true,
    tasks: []
  }
}
