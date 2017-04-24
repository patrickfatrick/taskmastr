/* global CustomEvent */

export function click () {
  return new CustomEvent('click')
}

export function dblclick () {
  return new CustomEvent('dblclick')
}

export function change () {
  return new CustomEvent('change')
}
