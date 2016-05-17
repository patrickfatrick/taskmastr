import _ from 'lodash'
import socket from '../../socket.js'
import { updateUser } from '../../services/user-services'
import { createList, getList, removeList, updateList, inviteUser, removeUser, confirmUser } from '../../services/list-services'

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

export function toggleListDetails ({ dispatch }, id) {
  dispatch('TOGGLE_LIST_DETAILS', id)
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
  const oldCurrent = _.find(state.user.tasks, { current: true })
  return getList(id, (err, response) => {
    if (err) return dispatch('SET_INVALID_LIST', err)
    dispatch('SET_CURRENT_LIST', response)
    dispatch('SET_INVALID_LIST', false)
    socket.emit('join', id)
    socket.on('change', (data) => {
      dispatch('SET_CURRENT_LIST', data)
    })
    return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
      if (err) return dispatch('SET_CURRENT_LIST', oldCurrent)
      return res
    })
  })
}

export function unmountList ({ dispatch, state }, id) {
  socket.emit('leave', id)
  dispatch('SET_CURRENT_LIST', null)
}

export function addList ({ dispatch, state }, list) {
  const userList = {
    _deleting: false,
    current: false,
    dateCreated: list.dateCreated,
    id: list.id,
    list: list.list,
    owner: state.user.username,
    users: []
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

export function deleteList ({ dispatch, state }, index, delay, perm, cb) {
  const lists = state.user.tasks
  const list = lists[index]
  if (lists.length === 1) return
  if (!list._deleting) {
    let timeoutID
    timeoutID = setTimeout(() => {
      // Get the next and previous lists after timeout,
      // in case indices change in the five-second window
      // Note: Switching to `state.user.tasks` in the timeout
      // Because the lists might have changed; reassign var `lists`?
      const curIndex = _.findIndex(state.user.tasks, { id: list.id })
      const prevList = state.user.tasks[curIndex - 1]
      const nextList = state.user.tasks[curIndex + 1]
      // Stop procedure if it's the only list
      if (state.user.tasks.length === 1) {
        dispatch('UPDATE_DELETE_QUEUE', list.id, null)
        dispatch('SET_LIST_DELETE', curIndex, false)
        return
      }
      // Reassign current list
      let newCurrent
      if (list.current) {
        newCurrent = (list.current && curIndex === (state.user.tasks.length - 1)) ? prevList : nextList
        dispatch('SET_CURRENT_LIST', newCurrent)
      }
      // Optimistically change the client's store before we've made the request
      dispatch('UPDATE_DELETE_QUEUE', list.id, null)
      dispatch('SET_LIST_DELETE', _.findIndex(state.user.tasks, { id: list.id }), false)
      dispatch('REMOVE_LIST', _.findIndex(state.user.tasks, { id: list.id }))
      const user = {
        username: state.user.username,
        tasks: state.user.tasks.filter((v) => {
          return v.id !== list.id
        })
      }
      return removeList(list.id, user, perm, (err, res) => {
        // Revert the change if request fails
        if (err) dispatch('ADD_LIST', list)
        cb(_.find(state.user.tasks, { current: true }).id)
      })
    }, delay)
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

export function addListUser ({ dispatch, state }, index, user) {
  const list = state.user.tasks[index]
  dispatch('ADD_LIST_USER', index, user)
  inviteUser(state.user, list.id, user.username, { users: list.users }, (err, response) => {
    if (err) dispatch('REMOVE_LIST_USER', index, user)
    return response
  })
}

export function removeListUser ({ dispatch, state }, index, user) {
  const list = state.user.tasks[index]
  dispatch('REMOVE_LIST_USER', index, user)
  removeUser(state.user, list.id, { users: list.users }, (err, response) => {
    if (err) dispatch('ADD_LIST_USER', index, user)
    return response
  })
}

export function confirmListUser ({ dispatch, state }, listid, username) {
  const listUser = {
    username: username,
    status: 'active'
  }
  confirmUser(state.user, listid, listUser, (err, response) => {
    if (err) return dispatch('SET_USER_STATUS', listid, username, 'pending')
    const userList = {
      _deleting: false,
      current: true,
      dateCreated: response.dateCreated,
      id: response.id,
      list: response.list,
      owner: response.owner,
      users: response.users
    }
    dispatch('ADD_LIST', userList)
    return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
      if (err) return dispatch('REMOVE_LIST', _.findIndex(state.user.tasks, { id: listid }))
      return res
    })
  })
}

export function setUsers ({ dispatch }, index, users) {
  dispatch('SET_USERS', index, users)
}
