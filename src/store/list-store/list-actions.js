import _ from 'lodash'
import socket from '../../socket.js'
import { updateUser } from '../../services/user-services'
import { createList, getList, removeList, updateList, inviteUser, removeUser, confirmUser } from '../../services/list-services'
import { isCurrent, findCurrent, findIndexById } from '../../helper-utilities/utils'

export function setMenuToggled ({ commit }, bool) {
  commit('SET_MENU_TOGGLED', bool)
}

export function setNewList ({ commit }, str) {
  commit('SET_NEW_LIST', str)
}

export function setListAttempt ({ commit }, bool) {
  commit('SET_LIST_ATTEMPT', bool)
}

export function setCurrentList ({ commit }, obj) {
  commit('SET_CURRENT_LIST', obj)
}

export function toggleListDetails ({ commit }, id) {
  commit('TOGGLE_LIST_DETAILS', id)
}

export function renameList ({ commit, state }, { index, name }) {
  const list = state.user.tasks[index]
  const oldName = list.list
  commit('RENAME_LIST', { index, name })
  return updateList(state.user, list._id, { list: list.list }, (err, res) => {
    if (err) return commit('RENAME_LIST', { index, name: oldName })
    return res
  })
}

export function mountList ({ commit, state }, id) {
  const oldCurrent = findCurrent(state.user.tasks, state.currentList)
  return getList(id, (err, response) => {
    if (err) return commit('SET_INVALID_LIST', err.message)
    commit('SET_CURRENT_LIST', response)
    commit('SET_INVALID_LIST', false)
    socket.emit('join', id)
    socket.on('change', (data) => {
      commit('SET_CURRENT_LIST', data)
    })

    return updateUser(state.user.username, { currentList: state.currentList }, (err, res) => {
      if (err) return commit('SET_CURRENT_LIST', oldCurrent)
      return res
    })
  })
}

export function unmountList ({ commit, state }, id, cb) {
  socket.emit('leave', id)
  commit('SET_CURRENT_LIST', null)
}

export function addList ({ commit, state }, list) {
  const userList = {
    _deleting: false,
    current: false,
    dateCreated: list.dateCreated,
    dateModified: list.dateModified,
    _id: list._id,
    list: list.list,
    owner: state.user.username,
    users: []
  }
  const user = {
    username: state.user.username,
    tasks: [
      userList._id,
      ...state.user.tasks.map((task) => task._id)
    ]
  }
  commit('ADD_LIST', userList)
  return createList(list, user, (err, response) => {
    if (err) return commit('REMOVE_LIST', 0)
  })
}

export function deleteList ({ commit, state }, { index, delay, perm, cb }) {
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
      const curIndex = findIndexById(state.user.tasks, list._id)
      const prevList = state.user.tasks[curIndex - 1]
      const nextList = state.user.tasks[curIndex + 1]
      // Stop procedure if it's the only list
      if (state.user.tasks.length === 1) {
        commit('UPDATE_DELETE_QUEUE', { id: list._id, val: null })
        commit('SET_LIST_DELETE', { index: curIndex, bool: false })
        return
      }
      // Reassign current list
      let newCurrent
      if (isCurrent(list, state.currentList)) {
        newCurrent = (curIndex === (state.user.tasks.length - 1))
          ? prevList
          : nextList
        commit('SET_CURRENT_LIST', newCurrent)
      }
      // Optimistically change the client's store before we've made the request
      commit('UPDATE_DELETE_QUEUE', { id: list._id, val: null })
      commit('SET_LIST_DELETE', { index: _.findIndex(state.user.tasks, { _id: list._id }), bool: false })
      commit('REMOVE_LIST', _.findIndex(state.user.tasks, { _id: list._id }))
      const user = {
        username: state.user.username,
        tasks: state.user.tasks.filter((v) => {
          return v._id !== list._id
        })
      }
      return removeList(list._id, user, perm, (err, res) => {
        // Revert the change if request fails
        if (err) commit('ADD_LIST', list)
        cb(state.currentList)
      })
    }, delay)
    commit('UPDATE_DELETE_QUEUE', { id: list._id, val: timeoutID })
    commit('SET_LIST_DELETE', { index: _.findIndex(lists, { _id: list._id }), bool: true })
  } else {
    clearTimeout(state.deleteQueue[list._id])
    commit('UPDATE_DELETE_QUEUE', { id: list._id, val: null })
    commit('SET_LIST_DELETE', { index: _.findIndex(lists, { _id: list._id }), bool: false })
  }
}

export function sortLists ({ commit, state }, { oldIndex, newIndex }) {
  commit('SORT_LISTS', { oldIndex, newIndex })
  return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
    if (err) return commit('SORT_LISTS', { oldIndex: newIndex, newIndex: oldIndex })
  })
}

export function addListUser ({ commit, state }, { index, user }) {
  const list = state.user.tasks[index]
  commit('ADD_LIST_USER', { index, user })
  inviteUser(state.user, list._id, user.username, { users: list.users }, (err, response) => {
    if (err) commit('REMOVE_LIST_USER', { index, user })
    return response
  })
}

export function removeListUser ({ commit, state }, { index, user }) {
  const list = state.user.tasks[index]
  commit('REMOVE_LIST_USER', { index, user })
  removeUser(state.user, list._id, { users: list.users }, (err, response) => {
    if (err) commit('ADD_LIST_USER', { index, user })
    if (state.user.username === user.username) {
      const curIndex = findIndexById(state.user.tasks, list._id)
      const prevList = state.user.tasks[curIndex - 1]
      const nextList = state.user.tasks[curIndex + 1]
      let newCurrent
      if (isCurrent(list, state.currentList)) {
        newCurrent = (curIndex === (state.user.tasks.length - 1))
          ? prevList
          : nextList
        commit('SET_CURRENT_LIST', newCurrent)
      }

      commit('REMOVE_LIST', _.findIndex(state.user.tasks, { _id: response._id }))
      return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
        if (err) return commit('ADD_LIST', response)
        return res
      })
    }
    return response
  })
}

export function confirmListUser ({ commit, state }, { listid, username }) {
  const listUser = {
    username: username,
    status: 'active'
  }
  confirmUser(state.user, listid, listUser, (err, response) => {
    if (err) return commit('SET_USER_STATUS', { id: listid, username, status: 'pending' })
    const userList = {
      _deleting: false,
      currentItem: response.currentItem,
      dateCreated: response.dateCreated,
      _id: response._id,
      list: response.list,
      owner: response.owner,
      users: response.users
    }

    commit('ADD_LIST', userList)
    return updateUser(state.user.username, { tasks: state.user.tasks }, (err, res) => {
      if (err) return commit('REMOVE_LIST', _.findIndex(state.user.tasks, { _id: listid }))
      return res
    })
  })
}

export function setUsers ({ commit }, { index, users }) {
  commit('SET_USERS', { index, users })
}
