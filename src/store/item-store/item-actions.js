import _ from 'lodash'
import { reform, setLocal } from 'gregorian'
import { updateList } from '../../services/list-services'
import { createItem, updateItem, deleteItem, deleteItems } from '../../services/item-services'
import { isCurrent, findIndexById, isOwner } from '../../helper-utilities/utils'

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
  const oldId = list.currentItem
  const isUserOwner = isOwner(list, state.user.username)
  const update = (isUserOwner)
    ? { currentItem: items[index]._id }
    : { ['users.' + list.users.findIndex((user) => user.username === state.user.username) + '.currentItem']: items[index]._id }
  commit('SET_CURRENT_TASK', { id: items[index]._id, isUserOwner })
  return updateList(state.user, list._id, update, (err, res) => {
    if (err) return commit('SET_CURRENT_TASK', { id: oldId, isUserOwner })
    return res
  })
}

export function toggleDetails ({ commit, state }, index) {
  if (state.detailsToggled === index) return commit('TOGGLE_DETAILS', null)
  window.scroll(0, 0)
  commit('TOGGLE_DETAILS', index)
}

export function setTaskDueDate ({ commit, state }, { index, date }) {
  const listID = state.current._id
  const item = state.current.items[index]
  const username = state.user.username
  const oldDate = item.dueDate
  const oldDueDateDifference = item._dueDateDifference
  commit('SET_TASK_DUE_DATE', { index, date })
  return updateItem(listID, item, username, (err, res) => {
    if (err) {
      commit('SET_TASK_DUE_DATE', { index, date: oldDate })
      commit('SET_DUE_DATE_DIFFERENCE', index, oldDueDateDifference)
      return
    }
    return res
  })
}

export function renameTask ({ commit, state }, { index, name }) {
  const listID = state.current._id
  const item = state.current.items[index]
  const username = state.user.username
  const oldName = item.item
  commit('RENAME_TASK', { index, name })
  return updateItem(listID, item, username, (err, res) => {
    if (err) return commit('RENAME_TASK', { index, name: oldName })
    return res
  })
}

export function setTaskNotes ({ commit, state }, { index, notes }) {
  const listID = state.current._id
  const item = state.current.items[index]
  const username = state.user.username
  const oldNotes = item.notes
  commit('SET_TASK_NOTES', { index, notes })
  return updateItem(listID, item, username, (err, res) => {
    if (err) return commit('SET_TASK_NOTES', { index, notes: oldNotes })
    return res
  })
}
export function addTask ({ commit, state }, task) {
  commit('ADD_TASK', task)
  return createItem(state.currentList, task, state.user.username, (err, res) => {
    if (err) return commit('REMOVE_TASK', 0)
    return res
  })
}

export function deleteTask ({ commit, state }, index) {
  const listID = state.current._id
  const tasks = state.current.items
  const task = tasks[index]
  let timeoutID
  if (!task._deleting) {
    timeoutID = setTimeout(() => {
      // Get the next and previous lists after timeout,
      // in case indices change in the five-second window
      const deleteTask = findIndexById(tasks, task._id)
      const prevTask = deleteTask - 1
      const nextTask = deleteTask + 1
      // Reassign current item
      if (isCurrent(task, state.current.currentItem)) {
        if (index === (tasks.length - 1)) {
          commit('SET_CURRENT_TASK', tasks[prevTask]._id)
        } else {
          commit('SET_CURRENT_TASK', tasks[nextTask]._id)
        }
      }
      // Optimistically delete the item from the store before request is made
      commit('UPDATE_DELETE_QUEUE', { id: task._id, val: null })
      commit('SET_TASK_DELETE', { index: deleteTask, bool: false })
      commit('REMOVE_TASK', deleteTask)
      return deleteItem(listID, task._id, deleteTask, state.user.username, (err, response) => {
        // Revert the change if request fails
        if (err) commit('ADD_TASK', task)
      })
    }, 5000)
    commit('UPDATE_DELETE_QUEUE', { id: task._id, val: timeoutID })
    commit('SET_TASK_DELETE', { index: findIndexById(tasks, task._id), bool: true })
  } else {
    clearTimeout(state.deleteQueue[task._id])
    commit('UPDATE_DELETE_QUEUE', { id: task._id, val: null })
    commit('SET_TASK_DELETE', { index: findIndexById(tasks, task._id), bool: false })
  }
}

export function deleteAllCompleteTasks ({ commit, state, getters }) {
  const completeTasks = getters.getCompleteTasks

  getters.getCompleteTasks.forEach((task) => {
    const index = findIndexById(state.current.items, task._id)
    commit('REMOVE_TASK', index)
  })

  const itemids = completeTasks.map((task) => task._id)

  return deleteItems(state.current._id, itemids, state.user.username, (err, response) => {
    // Revert the change if request fails
    if (err) {
      getters.getCompleteTasks.forEach((task) => {
        commit('ADD_TASK', task)
      })
    }
  })
}

export function completeTask ({ commit, state }, { index, bool }) {
  const tasks = state.current.items
  const dateCompleted = (bool) ? reform('iso')() : null
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
  const item = items[newIndex]

  return updateItem(list._id, item, state.user, (err, res) => {
    if (err) {
      commit('SET_TASK_COMPLETE', { index: newIndex, bool: !bool })
      commit('SET_DATE_COMPLETED', { index: newIndex, date: (!bool) ? reform('iso')() : null })
      commit('SET_COMPLETED_BY', { index: newIndex, username: (!bool) ? state.user.username : null })
      commit('SORT_TASKS', { oldIndex: newIndex, newIndex: index })
      return
    }

    return updateList(state.user, list._id, { items: items }, (err, res) => {
      if (err) return null
      return res
    })
  })
}

export function sortTasks ({ commit, state }, { oldIndex, newIndex }) {
  commit('SORT_TASKS', { oldIndex, newIndex })

  const list = state.current
  const items = state.current.items
  return updateList(state.user, list._id, { items: items }, (err, res) => {
    if (err) return commit('SORT_TASKS', { oldIndex: newIndex, newIndex: oldIndex })
    return res
  })
}

export function setDueDateDifference ({ commit }, { index, dueDate }) {
  if (!dueDate) {
    commit('SET_DUE_DATE_DIFFERENCE', { index, n: null })
    return
  }
  const today = setLocal('h')(6)()
  dueDate = new Date(dueDate)
  let diff = Math.floor(Math.round((dueDate - today) / 1000 / 60 / 60 / 24))
  commit('SET_DUE_DATE_DIFFERENCE', { index, n: diff })
}
