export function dblclick () {
  const dblclick = document.createEvent('HTMLEvents')
  dblclick.initEvent('dblclick', true, true, window)
  return dblclick
}

export function change () {
  const change = document.createEvent('HTMLEvents')
  change.initEvent('change', true, true, window)
  return change
}
