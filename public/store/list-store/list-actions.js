import _ from 'lodash'
import { updateUser } from '../../services/user-services'
import {createList, getList, removeList, updateList} from '../../services/list-services'

export function setMenuToggled ({ dispatch }, bool) {
  dispatch('SET_MENU_TOGGLED', bool)
}

export function setNewList ({ dispatch }, str) {
  dispatch('SET_NEW_LIST', str)
}

export function setListAttempt ({ dispatch }, bool) {
  dispatch('SET_LIST_ATTEMPT', bool)
}

export function setCurrentList ({ dispatch }, obj) {
  dispatch('SET_CURRENT_LIST', obj)
}

export function renameList ({ dispatch, state }, index, name) {
  const list = state.user.tasks[index]
  const oldName = list.list
  dispatch('RENAME_LIST', index, name)
  return updateList(state.user, list.id, { list: list.list }, (err, res) => {
    if (err) return dispatch('RENAME_LIST', index, oldName)
    return res
  })
}

export function mountList ({ dispatch, state }, id) {
  dispatch('SET_CURRENT_LIST', null)
  return getList(id, (err, response) => {
    if (err) return dispatch('SET_INVALID_LIST', err)
    const oldCurrent = _.find(state.user.tasks, { current: true })
    dispatch('SET_CURRENT_LIST', response)
    dispatch('SET_INVALID_LIST', false)
    return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
      if (err) return dispatch('SET_CURRENT_LIST', oldCurrent)
      return res
    })
  })
}

export function addList ({ dispatch, state }, list) {
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
}

export function deleteList ({ dispatch, state }, index, cb) {
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
      return removeList(list.id, user, (err, res) => {
        // Revert the change if request fails
        if (err) dispatch('ADD_LIST', list)
        cb(_.find(lists, { current: true }).id)
      })
    }, 5000)
    dispatch('UPDATE_DELETE_QUEUE', list.id, timeoutID)
    dispatch('SET_LIST_DELETE', _.findIndex(lists, { id: list.id }), true)
  } else {
    clearTimeout(state.deleteQueue[list.id])
    dispatch('UPDATE_DELETE_QUEUE', list.id, null)
    dispatch('SET_LIST_DELETE', _.findIndex(lists, { id: list.id }), false)
  }
}

export function sortLists ({ dispatch, state }, oldIndex, newIndex) {
  dispatch('SORT_LISTS', oldIndex, newIndex)
  return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
    if (err) return dispatch('SORT_LISTS', newIndex, oldIndex)
  })
}
