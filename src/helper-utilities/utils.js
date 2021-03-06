import _ from 'lodash'
import { setLocal, resetLocal, reform } from 'gregorian'

export function isDevelopment () {
  return process.env.NODE_ENV === 'development'
}

export function isCurrent (thing, currentThing) {
  return thing._id === currentThing
}

export function findCurrent (things, currentThing) {
  return _.find(things, { _id: currentThing })
}

export function findCurrentIndex (things, currentThing) {
  return _.findIndex(things, { _id: currentThing })
}

export function findById (things, id) {
  return _.find(things, { _id: id })
}

export function findIndexById (things, id) {
  return _.findIndex(things, { _id: id })
}

export function isOwner (list, username) {
  return list.owner === username
}

export const setDateTo6am = setLocal('h')(6)(resetLocal('h'))

export const reformISO = reform('iso')

export const reformPrettyDate = reform('n d, Y')
