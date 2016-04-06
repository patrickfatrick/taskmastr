import _ from 'lodash'
import {SET_MENU_TOGGLED, SET_NEW_LIST, SET_LIST_ATTEMPT, ADD_LIST, REMOVE_LIST, RENAME_LIST, SET_LIST_DELETE, SORT_LISTS, SET_CURRENT_LIST, SET_INVALID_LIST} from '../mutation-types'

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
  [RENAME_LIST] (state, index, name) {
    _.set(state, 'user.tasks[' + index + '].list', name)
  },
  [SET_LIST_DELETE] (state, index, bool) {
    _.set(state, 'user.tasks[' + index + ']._delete', bool)
  },
  [SORT_LISTS] (state, oldIndex, newIndex) {
    let spliced = state.user.tasks.splice(oldIndex, 1)
    state.user.tasks.splice(newIndex, 0, spliced[0])
  },
  [SET_CURRENT_LIST] (state, list) {
    _.set(_.find(state.user.tasks, {current: true}), 'current', false)
    if (!list) return _.set(state, 'current', {})
    const index = _.findIndex(state.user.tasks, {id: list.id})
    _.set(state, `user.tasks[${index}].current`, true)
    _.set(state, 'current', list)
  },
  [SET_INVALID_LIST] (state, err) {
    _.set(state, 'invalidList', err)
  }
}
