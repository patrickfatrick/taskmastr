import _ from 'lodash'
import {SET_CURRENT_TASK, ADD_TASK, REMOVE_TASK, SET_NEW_TASK, SET_PLACEHOLDER, SET_TASK_ATTEMPT, SET_TASK_COMPLETE, SET_COMPLETED_BY, SET_DATE_COMPLETED, SET_TASK_DELETE, RENAME_TASK, SET_TASK_DUE_DATE, UPDATE_DELETE_QUEUE, SORT_TASKS, TOGGLE_DETAILS, SET_TASK_NOTES, SET_DUE_DATE_DIFFERENCE} from '../mutation-types'

export default {
  [SET_CURRENT_TASK] (state, id, isUserOwner) {
    if (isUserOwner) {
      _.set(state, 'current.currentItem', id)
    } else {
      _.set(state.current.users.find((user) => user.username === state.user.username), 'currentItem', id)
    }
  },
  [ADD_TASK] (state, task) {
    state.current.items.unshift(task)
  },
  [REMOVE_TASK] (state, index) {
    state.current.items.splice(index, 1)
  },
  [SET_NEW_TASK] (state, task) {
    _.set(state, 'newTask', task)
  },
  [SET_PLACEHOLDER] (state, placeholder) {
    _.set(state, 'placeholder', placeholder)
  },
  [SET_TASK_ATTEMPT] (state, bool) {
    _.set(state, 'taskAttempt', bool)
  },
  [SET_TASK_COMPLETE] (state, { index, bool }) {
    _.set(state, 'current.items[' + index + '].complete', bool)
  },
  [SET_DATE_COMPLETED] (state, { index, date }) {
    _.set(state, 'current.items[' + index + '].dateCompleted', date)
  },
  [SET_COMPLETED_BY] (state, { index, username }) {
    _.set(state, `current.items[${index}].completedBy`, username)
  },
  [SET_TASK_DELETE] (state, { index, bool }) {
    _.set(state, 'current.items[' + index + ']._deleting', bool)
  },
  [RENAME_TASK] (state, { index, name }) {
    _.set(state, 'current.items[' + index + '].item', name)
  },
  [SET_TASK_DUE_DATE] (state, { index, date }) {
    _.set(state, 'current.items[' + index + '].dueDate', date)
  },
  [UPDATE_DELETE_QUEUE] (state, { id, val }) {
    _.set(state, 'deleteQueue[' + id + ']', val)
  },
  [SORT_TASKS] (state, { oldIndex, newIndex }) {
    const spliced = state.current.items.splice(oldIndex, 1)
    state.current.items.splice(newIndex, 0, spliced[0])
  },
  [TOGGLE_DETAILS] (state, index) {
    _.set(state, 'detailsToggled', index)
  },
  [SET_TASK_NOTES] (state, { index, notes }) {
    _.set(state, 'current.items[' + index + '].notes', notes)
  },
  [SET_DUE_DATE_DIFFERENCE] (state, { index, n }) {
    _.set(state, 'current.items[' + index + ']._dueDateDifference', n)
  }
}
