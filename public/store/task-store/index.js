import mutations from './task-mutations'

export default {
  state: {
    current: {
      items: []
    },
    deleteAgendas: [],
    taskAttempt: false,
    newTask: '',
    placeholder: '',
    detailsToggled: null
  },
  mutations: mutations
}
