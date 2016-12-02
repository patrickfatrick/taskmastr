import getParentByClass from '../../helper-utilities/get-parent-by-class'

export default {
  data () {
    return {
      drake: null,
      dragStart: null
    }
  },
  methods: {
    _drag (drake) {
      drake.on('drag', (el) => {
        this.dragStart = this._index(el)
      })
    },
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
          const parent = getParentByClass(e.target, 'table-row')
          if (parent) parent.classList.add('gu-draggable')
        }, 250)
      }
      function upHandler (e) {
        window.clearTimeout(touchTimeout)
        draggable = false
        const parent = getParentByClass(e.target, 'table-row')
        if (parent) parent.classList.remove('gu-draggable')
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
    },
    _drop (drake) {
      drake.on('drop', (el) => {
        let oldIndex = this.dragStart
        let newIndex = this._index(el)
        // This is defined in Items and Lists components
        this.sortFunction(oldIndex, newIndex)
      })
    }
  }
}
