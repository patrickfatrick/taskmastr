import _ from 'lodash'
import {SET_CURRENT_LIST, SET_MENU_TOGGLED, ADD_LIST, REMOVE_LIST, SET_NEW_LIST, SET_LIST_DELETE, SORT_LISTS} from '../mutation-types'

export const listMutations = {
  [SET_CURRENT_LIST] (state, index) {
    _.set(_.find(state.user.tasks, {current: true}), 'current', false)
    state.user.tasks[index].current = true
    state.user.current = state.user.tasks[index]
  },
  [SET_MENU_TOGGLED] (state, bool) {
    state.menuToggled = bool
  },
  [ADD_LIST] (state, list) {
    state.user.tasks.unshift(list)
  },
  [REMOVE_LIST] (state, index) {
    state.user.tasks.splice(index, 1)
  },
  [SET_NEW_LIST] (state, list) {
    state.newList = list
  },
  [SET_LIST_DELETE] (state, index, bool) {
    state.user.tasks[index].delete = bool
  },
  [SORT_LISTS] (state, oldIndex, newIndex) {
    let spliced = state.user.tasks.splice(oldIndex, 1)
    state.user.tasks.splice(newIndex, 0, spliced[0])
  }
}
