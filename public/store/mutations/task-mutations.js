import _ from 'lodash'
import {SET_CURRENT_TASK, ADD_TASK, REMOVE_TASK, SET_NEW_TASK, SET_TASK_COMPLETE, SET_TASK_DELETE, SET_TASK_DUE_DATE, DELETE_AGENDA, UPDATE_DELETE_QUEUE, SORT_TASKS} from '../mutation-types'

export const taskMutations = {
  [SET_CURRENT_TASK] (state, index) {
    _.set(_.find(state.user.current.items, {current: true}), 'current', false)
    _.set(state, 'user.current.items[' + index + '].current', true)
  },
  [ADD_TASK] (state, task) {
    state.user.current.items.unshift(task)
  },
  [REMOVE_TASK] (state, index) {
    state.user.current.items.splice(index, 1)
  },
  [SET_NEW_TASK] (state, task) {
    _.set(state, 'newTask', task)
  },
  [SET_TASK_COMPLETE] (state, index, bool) {
    _.set(state, 'user.current.items[' + index + '].complete', bool)
  },
  [SET_TASK_DELETE] (state, index, bool) {
    _.set(state, 'user.current.items[' + index + '].delete', bool)
  },
  [SET_TASK_DUE_DATE] (state, index, date) {
    _.set(state, 'user.current.items[' + index + '].dueDate', date)
  },
  [DELETE_AGENDA] (state, id) {
    state.deleteAgendas.push(id)
  },
  [UPDATE_DELETE_QUEUE] (state, id, val) {
    _.set(state, 'deleteQueue[' + id + ']', val)
  },
  [SORT_TASKS] (state, oldIndex, newIndex) {
    let spliced = state.user.current.items.splice(oldIndex, 1)
    state.user.current.items.splice(newIndex, 0, spliced[0])
  }
}
