import _ from 'lodash'
import {SET_CURRENT_LIST, SET_MENU_TOGGLED, ADD_LIST, REMOVE_LIST, SET_NEW_LIST, SET_LIST_ATTEMPT, RENAME_LIST, SET_LIST_DELETE, SORT_LISTS} from '../mutation-types'

export const listMutations = {
  [SET_CURRENT_LIST] (state, list) {
    _.set(_.find(state.user.tasks, {current: true}), 'current', false)
    const index = _.findIndex(state.user.tasks, {id: list.id})
    _.set(state, `user.tasks[${index}].current`, true)
    _.set(state, 'current', list)
  },
  [SET_MENU_TOGGLED] (state, bool) {
    _.set(state, 'menuToggled', bool)
  },
  [ADD_LIST] (state, list) {
    state.user.tasks.unshift(list)
  },
  [REMOVE_LIST] (state, index) {
    state.user.tasks.splice(index, 1)
  },
  [SET_NEW_LIST] (state, list) {
    _.set(state, 'newList', list)
  },
  [SET_LIST_ATTEMPT] (state, list) {
    _.set(state, 'listAttempt', list)
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
  }
}
