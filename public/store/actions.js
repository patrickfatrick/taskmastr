import _ from 'lodash'
import gregorian from 'gregorian'
import {getSession, login, create, reset, forgot, logout, updateUser} from '../services/user-services'
import {createList, getList, deleteList, updateList} from '../services/list-services'
import {createItem, updateItem, deleteItem} from '../services/item-services'

export default {
  /**
   * User Actions
   */
  setInit: 'SET_INIT',
  setAuth: 'SET_AUTH',
  setUsername: 'SET_USERNAME',
  setKey: 'SET_KEY',
  setConfirm: 'SET_CONFIRM',
  setTasks: 'SET_TASKS',
  setForgot: 'SET_FORGOT',
  setRememberMe: 'SET_REMEMBER_ME',
  setCreate: 'SET_CREATE',
  setInvalidKey: 'SET_INVALID_KEY',
  setLoginAttempt: 'SET_LOGIN_ATTEMPT',
  setCreateFail: 'SET_FORGOT_FAIL',
  setForgotAttempt: 'SET_FORGOT_ATTEMPT',
  setForgotEmail: 'SET_FORGOT_EMAIL',
  setForgotFail: 'SET_FORGOT_FAIL',
  setConfirmAttempt: 'SET_CONFIRM_ATTEMPT',
  setReset: 'SET_RESET',
  setResetAttempt: 'SET_RESET_ATTEMPT',
  setResetToken: 'SET_RESET_TOKEN',
  setResetFail: 'SET_RESET_FAIL',
  setResetKey: 'SET_RESET_KEY',
  setResetConfirmKey: 'SET_RESET_CONFIRM_KEY',
  setSaveButton: 'SET_SAVE_BUTTON',
  setDarkmode: (store, bool) => {
    store.dispatch('SET_DARKMODE', bool)
    return updateUser(store.state.user.username, { darkmode: bool }, (err, res) => {
      if (err) store.dispatch('SET_DARKMODE', !bool)
      return res
    })
  },
  getSession: (store) => {
    return getSession((err, response) => {
      if (err) return store.dispatch('SET_INIT', true)
      /**
       * Failsafes for IDs, set delete if it doesn't exist.
       */
      let tasks = (response.tasks) ? response.tasks : response.todos
      store.dispatch('SET_USERNAME', response.username)
      store.dispatch('SET_KEY', '')
      store.dispatch('SET_DARKMODE', response.darkmode)
      store.dispatch('SET_TASKS', tasks)
      store.dispatch('SET_CURRENT_LIST', _.find(tasks, { current: true }) || tasks[0])
      store.dispatch('SET_AUTH', response.username)
      return response.username
    })
  },
  loginUser: (store, username, key, rememberMe) => {
    return login(username, key, rememberMe, (err, response) => {
      if (err) {
        if (response.status === 204) return store.dispatch('SET_CREATE', true)
        if (response.status === 401) return store.dispatch('SET_INVALID_KEY', err)
      }
      let tasks = response.tasks || response.todos
      store.dispatch('SET_USERNAME', response.username)
      store.dispatch('SET_KEY', '')
      store.dispatch('SET_DARKMODE', response.darkmode)
      store.dispatch('SET_TASKS', tasks)
      store.dispatch('SET_CURRENT_LIST', _.find(tasks, { current: true }) || tasks[0])
      store.dispatch('SET_AUTH', response.username)
      return response.username
    })
  },
  createUser: (store, username, key, rememberMe) => {
    return create(username, key, rememberMe, (err, response) => {
      if (err) {
        if (response.status === 400) {
          store.dispatch('SET_CREATE_FAIL', err)
          store.dispatch('SET_CONFIRM_ATTEMPT', true)
          return
        }
      }
      store.dispatch('SET_USERNAME', response.username)
      store.dispatch('SET_KEY', '')
      store.dispatch('SET_CONFIRM', '')
      store.dispatch('SET_DARKMODE', response.darkmode)
      store.dispatch('SET_AUTH', response.username)
      return response.username
    })
  },
  forgotPassword: (store, username) => {
    forgot(username, (err, response) => {
      if (err) return store.dispatch('SET_FORGOT_FAIL', err)
      if (response.emailSent) return store.dispatch('SET_FORGOT_EMAIL', true)
    })
  },
  resetPassword: (store, token, key) => {
    return reset(token, key, (err, response) => {
      if (err) {
        return store.dispatch('SET_RESET_FAIL', err)
      }
      store.dispatch('SET_USERNAME', response.username)
      return response.username
    })
  },
  logoutUser: () => {
    return logout(() => {
      window.location.href = '/'
    })
  },
  /**
   * Task Actions
   */
  setNewTask: 'SET_NEW_TASK',
  setPlaceholder: 'SET_PLACEHOLDER',
  setTaskAttempt: 'SET_TASK_ATTEMPT',
  setTaskDelete: 'SET_TASK_DELETE',
  deleteAgenda: 'DELETE_AGENDA',
  setCurrentTask ({ dispatch, state }, index) {
    const list = state.current
    const items = state.current.items
    const oldIndex = _.findIndex(state.current.items, { current: true })
    dispatch('SET_CURRENT_TASK', index)
    return updateList(state.user, list.id, { items: items }, (err, res) => {
      if (err) return dispatch('SET_CURRENT_TASK', oldIndex)
      return res
    })
  },
  toggleDetails ({ dispatch, state }, index) {
    if (state.detailsToggled === index) return dispatch('TOGGLE_DETAILS', null)
    dispatch('TOGGLE_DETAILS', index)
  },
  setTaskDueDate ({ dispatch, state }, index, date) {
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
  },
  renameTask ({ dispatch, state }, index, name) {
    const listID = state.current.id
    const item = state.current.items[index]
    const username = state.user.username
    const oldName = item.item
    dispatch('RENAME_TASK', index, name)
    return updateItem(listID, item.id, index, item, username, (err, res) => {
      if (err) return dispatch('RENAME_TASK', index, oldName)
      return res
    })
  },
  setTaskNotes ({ dispatch, state }, index, notes) {
    const listID = state.current.id
    const item = state.current.items[index]
    const username = state.user.username
    const oldNotes = item.notes
    dispatch('SET_TASK_NOTES', index, notes)
    return updateItem(listID, item.id, index, item, username, (err, res) => {
      if (err) return dispatch('SET_TASK_NOTES', index, oldNotes)
      return res
    })
  },
  addTask: ({ dispatch, state }, task) => {
    dispatch('ADD_TASK', task)
    return createItem(state.current.id, task, state.user.username, (err, res) => {
      if (err) return dispatch('REMOVE_TASK', 0)
      return res
    })
  },
  deleteTask (store, index) {
    const listID = store.state.current.id
    const tasks = store.state.current.items
    const task = tasks[index]
    if (!task._delete) {
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
            store.dispatch('SET_CURRENT_TASK', prevTask)
          } else {
            store.dispatch('SET_CURRENT_TASK', nextTask)
          }
        }
        // Optimistically delete the item from the store before request is made
        store.dispatch('DELETE_AGENDA', task.id)
        store.dispatch('UPDATE_DELETE_QUEUE', task.id, null)
        store.dispatch('SET_TASK_DELETE', deleteTask, false)
        store.dispatch('REMOVE_TASK', deleteTask)
        return deleteItem(listID, task.id, deleteTask, (err, response) => {
          // Revert the change if request fails
          if (err) store.dispatch('ADD_TASK', task)
        })
      }, 5000)
      store.dispatch('UPDATE_DELETE_QUEUE', task.id, timeoutID)
      store.dispatch('SET_TASK_DELETE', _.findIndex(tasks, { id: task.id }), true)
    } else {
      clearTimeout(store.state.deleteQueue[task.id])
      store.dispatch('UPDATE_DELETE_QUEUE', task.id, null)
      store.dispatch('SET_TASK_DELETE', _.findIndex(tasks, { id: task.id }), false)
    }
  },
  completeTask ({ dispatch, state }, index, bool) {
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
  },
  sortTasks ({ dispatch, state }, oldIndex, newIndex) {
    dispatch('SORT_TASKS', oldIndex, newIndex)

    const list = state.current
    const items = state.current.items
    return updateList(state.user, list.id, { items: items }, (err, res) => {
      if (err) return dispatch('SORT_TASKS', newIndex, oldIndex)
      return res
    })
  },
  setDueDateDifference (store, index, dueDate) {
    if (!dueDate) {
      store.dispatch('SET_DUE_DATE_DIFFERENCE', index, null)
      return
    }
    const today = gregorian.reform(new Date()).set(6, 'h').recite()
    dueDate = new Date(dueDate)
    let diff = Math.floor(Math.round((dueDate - today) / 1000 / 60 / 60 / 24))
    store.dispatch('SET_DUE_DATE_DIFFERENCE', index, diff)
  },
  /**
   * List Actions
   */
  setMenuToggled: 'SET_MENU_TOGGLED',
  setNewList: 'SET_NEW_LIST',
  setListAttempt: 'SET_LIST_ATTEMPT',
  setCurrentList: 'SET_CURRENT_LIST',
  renameList: ({ dispatch, state }, index, name) => {
    const list = state.user.tasks[index]
    const oldName = list.list
    dispatch('RENAME_LIST', index, name)
    return updateList(state.user, list.id, { list: list.list }, (err, res) => {
      if (err) return dispatch('RENAME_LIST', index, oldName)
      return res
    })
  },
  mountList: ({ dispatch, state }, id) => {
    return getList(id, (err, response) => {
      if (err) return console.error(err)
      const oldCurrent = _.find(state.user.tasks, {current: true})
      dispatch('SET_CURRENT_LIST', response)
      return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
        if (err) return dispatch('SET_CURRENT_LIST', oldCurrent)
        return res
      })
    })
  },
  addList: ({ dispatch, state }, list) => {
    const userList = {
      id: list.id,
      list: list.list,
      current: false,
      _delete: false
    }
    const user = {
      username: state.user.username,
      tasks: [
        userList,
        ...state.user.tasks
      ]
    }
    dispatch('ADD_LIST', userList)
    return createList(list, user, (err, response) => {
      if (err) return dispatch('REMOVE_LIST', 0)
    })
  },
  deleteList ({ dispatch, state }, index) {
    const lists = state.user.tasks
    const list = lists[index]
    if (lists.length === 1) return
    if (!list._delete) {
      let timeoutID
      timeoutID = setTimeout(() => {
        // Get the next and previous lists after timeout,
        // in case indices change in the five-second window
        let prevList = lists[index - 1]
        let nextList = lists[index + 1]
        // Stop procedure if it's the only list
        if (lists.length === 1) {
          dispatch('UPDATE_DELETE_QUEUE', list.id, null)
          dispatch('SET_LIST_DELETE', _.findIndex(lists, { id: list.id }), false)
          return
        }
        // Reassign current list
        if (list.current) {
          if (list.current && index === (lists.length - 1)) {
            dispatch('SET_CURRENT_LIST', _.find(lists, prevList))
          } else {
            dispatch('SET_CURRENT_LIST', _.find(lists, nextList))
          }
        }
        // Optimistically change the client's store before we've made the request
        dispatch('UPDATE_DELETE_QUEUE', list.id, null)
        dispatch('SET_LIST_DELETE', _.findIndex(lists, { id: list.id }), false)
        dispatch('REMOVE_LIST', _.findIndex(lists, { id: list.id }))
        const user = {
          username: state.user.username,
          tasks: state.user.tasks.filter((v) => {
            return v.id !== list.id
          })
        }
        return deleteList(list.id, user, (err, response) => {
          // Revert the change if request fails
          if (err) dispatch('ADD_LIST', list)
        })
      }, 5000)
      dispatch('UPDATE_DELETE_QUEUE', list.id, timeoutID)
      dispatch('SET_LIST_DELETE', _.findIndex(lists, { id: list.id }), true)
    } else {
      clearTimeout(state.deleteQueue[list.id])
      dispatch('UPDATE_DELETE_QUEUE', list.id, null)
      dispatch('SET_LIST_DELETE', _.findIndex(lists, { id: list.id }), false)
    }
  },
  sortLists ({ dispatch, state }, oldIndex, newIndex) {
    dispatch('SORT_LISTS', oldIndex, newIndex)
    return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
      if (err) return dispatch('SORT_LISTS', newIndex, oldIndex)
    })
  }
}
