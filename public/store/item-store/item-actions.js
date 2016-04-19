import _ from 'lodash'
import gregorian from 'gregorian'
import { updateList } from '../../services/list-services'
import { createItem, updateItem, deleteItem } from '../../services/item-services'

export function setNewTask ({ dispatch }, str) {
  dispatch('SET_NEW_TASK', str)
}

export function setPlaceholder ({ dispatch }, str) {
  dispatch('SET_PLACEHOLDER', str)
}

export function setTaskAttempt ({ dispatch }, bool) {
  dispatch('SET_TASK_ATTEMPT', bool)
}

export function setTaskDelete ({ dispatch }, bool) {
  dispatch('SET_TASK_DELETE', bool)
}

export function setCurrentTask ({ dispatch, state }, index) {
  const list = state.current
  const items = state.current.items
  const oldIndex = _.findIndex(state.current.items, { current: true })
  dispatch('SET_CURRENT_TASK', index)
  return updateList(state.user, list.id, { items: items }, (err, res) => {
    if (err) return dispatch('SET_CURRENT_TASK', oldIndex)
    return res
  })
}

export function toggleDetails ({ dispatch, state }, index) {
  if (state.detailsToggled === index) return dispatch('TOGGLE_DETAILS', null)
  dispatch('TOGGLE_DETAILS', index)
}

export function setTaskDueDate ({ dispatch, state }, index, date) {
  const listID = state.current.id
  const item = state.current.items[index]
  const username = state.user.username
  const oldDate = item.dueDate
  const oldDueDateDifference = item._dueDateDifference
  dispatch('SET_TASK_DUE_DATE', index, date)
  return updateItem(listID, item.id, index, item, username, (err, res) => {
    if (err) {
      dispatch('SET_TASK_DUE_DATE', index, oldDate)
      dispatch('SET_DUE_DATE_DIFFERENCE', index, oldDueDateDifference)
      return
    }
    return res
  })
}

export function renameTask ({ dispatch, state }, index, name) {
  const listID = state.current.id
  const item = state.current.items[index]
  const username = state.user.username
  const oldName = item.item
  dispatch('RENAME_TASK', index, name)
  return updateItem(listID, item.id, index, item, username, (err, res) => {
    if (err) return dispatch('RENAME_TASK', index, oldName)
    return res
  })
}

export function setTaskNotes ({ dispatch, state }, index, notes) {
  const listID = state.current.id
  const item = state.current.items[index]
  const username = state.user.username
  const oldNotes = item.notes
  dispatch('SET_TASK_NOTES', index, notes)
  return updateItem(listID, item.id, index, item, username, (err, res) => {
    if (err) return dispatch('SET_TASK_NOTES', index, oldNotes)
    return res
  })
}
export function addTask ({ dispatch, state }, task) {
  dispatch('ADD_TASK', task)
  return createItem(state.current.id, task, state.user.username, (err, res) => {
    if (err) return dispatch('REMOVE_TASK', 0)
    return res
  })
}

export function deleteTask ({ dispatch, state }, index) {
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
          dispatch('SET_CURRENT_TASK', prevTask)
        } else {
          dispatch('SET_CURRENT_TASK', nextTask)
        }
      }
      // Optimistically delete the item from the store before request is made
      dispatch('UPDATE_DELETE_QUEUE', task.id, null)
      dispatch('SET_TASK_DELETE', deleteTask, false)
      dispatch('REMOVE_TASK', deleteTask)
      return deleteItem(listID, task.id, deleteTask, state.user.username, (err, response) => {
        // Revert the change if request fails
        if (err) dispatch('ADD_TASK', task)
      })
    }, 5000)
    dispatch('UPDATE_DELETE_QUEUE', task.id, timeoutID)
    dispatch('SET_TASK_DELETE', _.findIndex(tasks, { id: task.id }), true)
  } else {
    clearTimeout(state.deleteQueue[task.id])
    dispatch('UPDATE_DELETE_QUEUE', task.id, null)
    dispatch('SET_TASK_DELETE', _.findIndex(tasks, { id: task.id }), false)
  }
}

export function completeTask ({ dispatch, state }, index, bool) {
  const tasks = state.current.items
  const dateCompleted = (bool) ? gregorian.reform().to('iso') : null
  const n = (tasks[index].complete) ? 0 : -1
  const newIndex = (_.findIndex(tasks, {complete: true}) !== -1)
    ? _.findIndex(tasks, {complete: true}) + n
    : tasks.length
  dispatch('SET_TASK_COMPLETE', index, bool)
  dispatch('SET_DATE_COMPLETED', index, dateCompleted)
  if (bool) {
    dispatch('SET_TASK_DUE_DATE', index, null)
    dispatch('SET_DUE_DATE_DIFFERENCE', index, null)
  }
  dispatch('SORT_TASKS', index, newIndex)

  const list = state.current
  const items = state.current.items
  return updateList(state.user, list.id, { items: items }, (err, res) => {
    if (err) {
      dispatch('SORT_TASKS', newIndex, index)
      dispatch('SET_TASK_COMPLETE', index, !bool)
      dispatch('SET_DATE_COMPLETED', index, (!bool) ? gregorian.reform().to('iso') : null)
      return
    }
    return res
  })
}

export function sortTasks ({ dispatch, state }, oldIndex, newIndex) {
  dispatch('SORT_TASKS', oldIndex, newIndex)

  const list = state.current
  const items = state.current.items
  return updateList(state.user, list.id, { items: items }, (err, res) => {
    if (err) return dispatch('SORT_TASKS', newIndex, oldIndex)
    return res
  })
}

export function setDueDateDifference ({ dispatch }, index, dueDate) {
  if (!dueDate) {
    dispatch('SET_DUE_DATE_DIFFERENCE', index, null)
    return
  }
  const today = gregorian.reform(new Date()).set(6, 'h').recite()
  dueDate = new Date(dueDate)
  let diff = Math.floor(Math.round((dueDate - today) / 1000 / 60 / 60 / 24))
  dispatch('SET_DUE_DATE_DIFFERENCE', index, diff)
}
