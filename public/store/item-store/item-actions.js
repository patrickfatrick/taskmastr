import _ from 'lodash'
import gregorian from 'gregorian'
import { updateList } from '../../services/list-services'
import { createItem, updateItem, deleteItem } from '../../services/item-services'

export function setNewTask ({ commit }, str) {
  commit('SET_NEW_TASK', str)
}

export function setPlaceholder ({ commit }, str) {
  commit('SET_PLACEHOLDER', str)
}

export function setTaskAttempt ({ commit }, bool) {
  commit('SET_TASK_ATTEMPT', bool)
}

export function setTaskDelete ({ commit }, bool) {
  commit('SET_TASK_DELETE', bool)
}

export function setCurrentTask ({ commit, state }, index) {
  const list = state.current
  const items = state.current.items
  const oldIndex = _.findIndex(state.current.items, { current: true })
  commit('SET_CURRENT_TASK', index)
  return updateList(state.user, list.id, { items: items }, (err, res) => {
    if (err) return commit('SET_CURRENT_TASK', oldIndex)
    return res
  })
}

export function toggleDetails ({ commit, state }, index) {
  if (state.detailsToggled === index) return commit('TOGGLE_DETAILS', null)
  commit('TOGGLE_DETAILS', index)
}

export function setTaskDueDate ({ commit, state }, { index, date }) {
  const listID = state.current.id
  const item = state.current.items[index]
  const username = state.user.username
  const oldDate = item.dueDate
  const oldDueDateDifference = item._dueDateDifference
  commit('SET_TASK_DUE_DATE', { index, date })
  return updateItem(listID, item.id, index, item, username, (err, res) => {
    if (err) {
      commit('SET_TASK_DUE_DATE', { index, date: oldDate })
      commit('SET_DUE_DATE_DIFFERENCE', index, oldDueDateDifference)
      return
    }
    return res
  })
}

export function renameTask ({ commit, state }, { index, name }) {
  const listID = state.current.id
  const item = state.current.items[index]
  const username = state.user.username
  const oldName = item.item
  commit('RENAME_TASK', { index, name })
  return updateItem(listID, item.id, index, item, username, (err, res) => {
    if (err) return commit('RENAME_TASK', { index, name: oldName })
    return res
  })
}

export function setTaskNotes ({ commit, state }, { index, notes }) {
  const listID = state.current.id
  const item = state.current.items[index]
  const username = state.user.username
  const oldNotes = item.notes
  commit('SET_TASK_NOTES', { index, notes })
  return updateItem(listID, item.id, index, item, username, (err, res) => {
    if (err) return commit('SET_TASK_NOTES', { index, notes: oldNotes })
    return res
  })
}
export function addTask ({ commit, state }, task) {
  commit('ADD_TASK', task)
  return createItem(state.current.id, task, state.user.username, (err, res) => {
    if (err) return commit('REMOVE_TASK', 0)
    return res
  })
}

export function deleteTask ({ commit, state }, index) {
  const listID = state.current.id
  const tasks = state.current.items
  const task = tasks[index]
  if (!task._deleting) {
    let timeoutID
    timeoutID = setTimeout(() => {
      // Get the next and previous lists after timeout,
      // in case indices change in the five-second window
      const deleteTask = _.findIndex(tasks, { id: task.id })
      const prevTask = deleteTask - 1
      const nextTask = deleteTask + 1
      // Reassign current item
      if (task.current) {
        if (task.current && index === (tasks.length - 1)) {
          commit('SET_CURRENT_TASK', prevTask)
        } else {
          commit('SET_CURRENT_TASK', nextTask)
        }
      }
      // Optimistically delete the item from the store before request is made
      commit('UPDATE_DELETE_QUEUE', { id: task.id, val: null })
      commit('SET_TASK_DELETE', { index: deleteTask, bool: false })
      commit('REMOVE_TASK', deleteTask)
      return deleteItem(listID, task.id, deleteTask, state.user.username, (err, response) => {
        // Revert the change if request fails
        if (err) commit('ADD_TASK', task)
      })
    }, 5000)
    commit('UPDATE_DELETE_QUEUE', { id: task.id, val: timeoutID })
    commit('SET_TASK_DELETE', { index: _.findIndex(tasks, { id: task.id }), bool: true })
  } else {
    clearTimeout(state.deleteQueue[task.id])
    commit('UPDATE_DELETE_QUEUE', { id: task.id, val: null })
    commit('SET_TASK_DELETE', { index: _.findIndex(tasks, { id: task.id }), bool: false })
  }
}

export function deleteAllCompleteTasks ({ commit, state, getters }) {
  getters.getCompleteTasks.forEach((task) => {
    const index = _.findIndex(state.current.tasks, { id: task.id })
    commit('REMOVE_TASK', index)
    return deleteItem(state.current.id, task.id, index, state.user.username, (err, response) => {
      // Revert the change if request fails
      if (err) commit('ADD_TASK', task)
    })
  })
}

export function completeTask ({ commit, state }, { index, bool }) {
  const tasks = state.current.items
  const dateCompleted = (bool) ? gregorian.reform().to('iso') : null
  const completedBy = (bool) ? state.user.username : null
  const n = (tasks[index].complete) ? 0 : -1
  const newIndex = (_.findIndex(tasks, {complete: true}) !== -1)
    ? _.findIndex(tasks, {complete: true}) + n
    : tasks.length - 1
  commit('SET_TASK_COMPLETE', { index, bool })
  commit('SET_DATE_COMPLETED', { index, date: dateCompleted })
  commit('SET_COMPLETED_BY', { index, username: completedBy })
  if (bool) {
    commit('SET_TASK_DUE_DATE', { index, date: null })
    commit('SET_DUE_DATE_DIFFERENCE', { index, n: null })
  }
  commit('SORT_TASKS', { oldIndex: index, newIndex })

  const list = state.current
  const items = state.current.items
  return updateList(state.user, list.id, { items: items }, (err, res) => {
    if (err) {
      commit('SET_TASK_COMPLETE', { index: newIndex, bool: !bool })
      commit('SET_DATE_COMPLETED', { index: newIndex, date: (!bool) ? gregorian.reform().to('iso') : null })
      commit('SET_COMPLETED_BY', { index: newIndex, username: (!bool) ? state.user.username : null })
      commit('SORT_TASKS', { oldIndex: newIndex, newIndex: index })
      return
    }
    return res
  })
}

export function sortTasks ({ commit, state }, { oldIndex, newIndex }) {
  commit('SORT_TASKS', { oldIndex, newIndex })

  const list = state.current
  const items = state.current.items
  return updateList(state.user, list.id, { items: items }, (err, res) => {
    if (err) return commit('SORT_TASKS', { oldIndex: newIndex, newIndex: oldIndex })
    return res
  })
}

export function setDueDateDifference ({ commit }, { index, dueDate }) {
  if (!dueDate) {
    commit('SET_DUE_DATE_DIFFERENCE', { index, n: null })
    return
  }
  const today = gregorian.reform(new Date()).set(6, 'h').recite()
  dueDate = new Date(dueDate)
  let diff = Math.floor(Math.round((dueDate - today) / 1000 / 60 / 60 / 24))
  commit('SET_DUE_DATE_DIFFERENCE', { index, n: diff })
}
