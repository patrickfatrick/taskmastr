import _ from 'lodash'
import {SET_MENU_TOGGLED, SET_NEW_LIST, SET_LIST_ATTEMPT, ADD_LIST, REMOVE_LIST, RENAME_LIST, SET_LIST_DELETE, SORT_LISTS, SET_CURRENT_LIST, SET_INVALID_LIST, TOGGLE_LIST_DETAILS, ADD_LIST_USER, REMOVE_LIST_USER, SET_USERS, SET_USER_STATUS} from '../mutation-types'

export default {
  [SET_MENU_TOGGLED] (state, bool) {
    _.set(state, 'menuToggled', bool)
  },
  [SET_NEW_LIST] (state, list) {
    _.set(state, 'newList', list)
  },
  [SET_LIST_ATTEMPT] (state, list) {
    _.set(state, 'listAttempt', list)
  },
  [ADD_LIST] (state, list) {
    state.user.tasks.unshift(list)
  },
  [REMOVE_LIST] (state, index) {
    state.user.tasks.splice(index, 1)
  },
  [RENAME_LIST] (state, { index, name }) {
    _.set(state, 'user.tasks[' + index + '].list', name)
  },
  [SET_LIST_DELETE] (state, { index, bool }) {
    _.set(state, 'user.tasks[' + index + ']._deleting', bool)
  },
  [SORT_LISTS] (state, { oldIndex, newIndex }) {
    let spliced = state.user.tasks.splice(oldIndex, 1)
    state.user.tasks.splice(newIndex, 0, spliced[0])
  },
  [SET_CURRENT_LIST] (state, list) {
    if (!list) {
      _.set(state, 'current', {})
      _.set(state, 'currentList', '')
    } else {
      _.set(state, 'current', list)
      _.set(state, 'currentList', list._id)
    }
  },
  [SET_INVALID_LIST] (state, err) {
    _.set(state, 'invalidList', err)
  },
  [TOGGLE_LIST_DETAILS] (state, id) {
    _.set(state, 'listDetailsToggled', id)
  },
  [ADD_LIST_USER] (state, { index, user }) {
    state.user.tasks[index].users.push(user)
  },
  [REMOVE_LIST_USER] (state, { index, user }) {
    state.user.tasks[index].users.splice(_.findIndex(state.user.tasks[index].users, user), 1)
  },
  [SET_USERS] (state, { index, users }) {
    _.set(state, `user.tasks[${index}].users`, users)
  },
  [SET_USER_STATUS] (state, { id, username, status }) {
    const userIndex = _.findIndex(state.user.tasks[id].users, { username })
    _.set(state, `user.tasks[${id}].users[${userIndex}]`, { status })
  }
}
