<template>
  <div>
    <div id="task-list" class="table" v-show='allTasks'>
      <div class="table-body" ref="dragula">
        <item v-for="task in activeTasks" :key="task.id" class="task table-row" :class="{'deleting': task._deleting, 'complete': task.complete, 'active': task.current}" :task="task">
        </item>
      </div>
      <div id="clear-complete-button-container">
        <button id="clear-complete-button">Clear all complete items</button>
      </div>
      <div class="table-body">
        <item v-for="task in completeTasks" :key="task.id" class="task table-row" :class="{'deleting': task._deleting, 'complete': task.complete, 'active': task.current}" :task="task">
        </item>
      </div>
    </div>
    <item-details v-for="(task, index) in allTasks" :index="index" :task="task"></item-details>
  </div>
</template>

<script>
import _ from 'lodash'
import dragula from 'dragula'
import Mousetrap from 'mousetrap'
import { mapGetters, mapActions } from 'vuex'
import Item from './Item.vue'
import ItemDetails from './ItemDetails.vue'
import getParentByClass from '../../../helper-utilities/get-parent-by-class'

export default {
  data () {
    return {
      drake: null,
      dragStart: null
    }
  },
  computed: mapGetters({
    activeTasks: 'getActiveTasks',
    completeTasks: 'getCompleteTasks',
    allTasks: 'getAllTasks'
  }),
  components: {
    Item,
    ItemDetails
  },
  methods: {
    ...mapActions([
      'setCurrentTask',
      'deleteTask',
      'completeTask',
      'sortTasks',
      'toggleDetails'
    ]),
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
        getParentByClass(e.target, 'table-row').classList.remove('gu-draggable')
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
    },
    _drop (drake) {
      drake.on('drop', (el) => {
        let oldIndex = this.dragStart
        let newIndex = this._index(el)
        this.sortTasks({ oldIndex, newIndex })
      })
    }
  },
  mounted () {
    // Keyboard bindings
    Mousetrap.bind('ctrl+,', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = _.findIndex(this.allTasks, {current: true})
      index = (index === 0)
        ? this.allTasks.length - 1
        : index - 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+.', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = _.findIndex(this.allTasks, {current: true})
      index = (index === this.allTasks.length - 1)
        ? 0
        : index + 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+backspace', () => {
      this.deleteTask(_.findIndex(this.allTasks, {current: true}))
    })
    Mousetrap.bind('ctrl+c', () => {
      this.completeTask({ index: _.findIndex(this.allTasks, {current: true}), bool: !(_.find(this.allTasks, {current: true}).complete) })
    })
    Mousetrap.bind('ctrl+command+down', () => {
      const completeIndex = _.findIndex(this.allTasks, {complete: true})
      const currentIndex = _.findIndex(this.allTasks, {current: true})

      if (completeIndex !== -1) {
        if (!this.allTasks[currentIndex].complete && currentIndex === completeIndex - 1) return
      }
      if (currentIndex === this.allTasks.length - 1) return

      this.sortTasks({ oldIndex: currentIndex, newIndex: currentIndex + 1 })
    })
    Mousetrap.bind('ctrl+command+up', () => {
      const completeIndex = _.findIndex(this.allTasks, {complete: true})
      const currentIndex = _.findIndex(this.allTasks, {current: true})

      if (completeIndex !== -1) {
        if (this.allTasks[currentIndex].complete && currentIndex === completeIndex) return
      }
      if (currentIndex === 0) return

      this.sortTasks({ oldIndex: currentIndex, newIndex: currentIndex - 1 })
    })

    this.$nextTick(() => {
      this.drake = dragula({
        containers: [this.$refs.dragula],
        revertOnSpill: true,
        mirrorContainer: this.$refs.dragula
        // ,
        // moves: (el, source, handle) => {
        //   if (handle.classList.contains('sort-handle')) return true
        //   return false
        // }
      })
      this._drag(this.drake)
      this._drop(this.drake)
      this._restrict(this.$refs.dragula)
    })
  }
}
</script>
