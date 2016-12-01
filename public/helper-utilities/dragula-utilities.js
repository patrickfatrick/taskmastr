import getParentByClass from './get-parent-by-class'

export default {
  _restrict (el) {
    let touchTimeout
    let draggable = false

    function moveHandler (e) {
      if (!draggable) {
        e.stopPropagation()
        upHandler(e)
      }
    }
    function downHandler (e) {
      touchTimeout = window.setTimeout(() => {
        draggable = true
        getParentByClass(e.target, 'table-row').classList.add('gu-draggable')
      }, 250)
    }
    function upHandler (e) {
      window.clearTimeout(touchTimeout)
      draggable = false
      getParentByClass(e.target, 'table-row').classList.remove('gu-draggable')
    }

    el.addEventListener('touchmove', moveHandler)
    el.addEventListener('mousemove', moveHandler)

    el.addEventListener('touchstart', downHandler)
    el.addEventListener('mousedown', downHandler)

    el.addEventListener('touchend', upHandler)
    el.addEventListener('mouseup', upHandler)
  },
  _index (el) {
    var index = 0
    if (!el || !el.parentNode) return -1
    while (el && (el = el.previousElementSibling)) index++
    return index
  }
}
