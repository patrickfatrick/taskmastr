<template>
  <div id="task-list" class="table" v-show='tasks'>
    <div class="table-body" v-el:dragula>
      <div v-for="task in tasks" class="task table-row" name="task{{$index + 1}}" :class="{'deleting': task._delete, 'complete': task.complete, 'active': task.current}" transition="item">
        <div class="table-header">
          <input class="check" type="checkbox" :value="task.complete"></input>
          <button class="complete" title="Complete task" @click.prevent="completeTask($index, !task.complete)">
            <i class="fa" :class="{'fa-check-circle': task.complete, 'fa-circle-o': !task.complete}"></i>
          </button>
        </div>
        <div class="task-cell table-data">
          <button class="name" title="{{task.item}}" @click="setCurrentTask($index)" @dblclick.prevent="toggleDetails($index)">{{task.item}}</button>
        </div>
        <div class="utils table-data">
          <button class="details-button" title="Toggle details pane" @click.prevent="toggleDetails($index, true)" v-bind:class="{'active': task.dueDate, 'overdue': task._dueDateDifference < 0, 'due': task._dueDateDifference === 0}">
            <i class="fa" :class="{'fa-pencil-square-o': !task._dueDateDifference || task._dueDateDifference > 0 || task.complete, 'fa-exclamation-triangle': task._dueDateDifference < 0 && !task.complete}"></i>
          </button>
          <button class="sort-button sort-handle" title="Sort task">
            <i class="sort-handle fa fa-arrows-v"></i>
          </button>
          <button class="delete-button" title="Delete task" @click.prevent="deleteTask($index)">
            <i class="fa" :class="{'fa-trash-o': !task._delete, 'fa-undo': task._delete}"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <item-details v-for="task in tasks" :index="$index" :task="task"></item-details>
</template>

<script>

import _ from 'lodash'
import dragula from 'dragula'
import Mousetrap from 'mousetrap'
import { setCurrentTask, deleteTask, completeTask, sortTasks, toggleDetails } from '../../../store/item-store/item-actions'
import ItemDetails from './ItemDetails.vue'

export default {
  vuex: {
    getters: {
      tasks: (state) => state.current.items
    },
    actions: {
      setCurrentTask,
      deleteTask,
      completeTask,
      sortTasks,
      toggleDetails
    }
  },
  data () {
    return {
      drake: null,
      dragStart: null
    }
  },
  components: {
    ItemDetails
  },
  methods: {
    _drag (drake) {
      drake.on('drag', (el) => {
        this.dragStart = this._index(el)
      })
    },
    _drop (drake) {
      drake.on('drop', (el) => {
        let oldIndex = this.dragStart
        let newIndex = this._index(el)
        // Revert if trying to move complete task into incomplete list and vice versa
        let completeIndex = _.findIndex(this.tasks, {complete: true})
        if (completeIndex !== -1) {
          if (this.tasks[oldIndex].complete && newIndex < completeIndex) return this.drake.cancel()
          if (!this.tasks[oldIndex].complete && newIndex >= completeIndex) return this.drake.cancel()
        }
        this.sortTasks(oldIndex, newIndex)
      })
    },
    _index (el) {
      var index = 0
      if (!el || !el.parentNode) return -1
      while (el && (el = el.previousElementSibling)) index++
      return index
    }
  },
  compiled () {
    // Keyboard bindings
    Mousetrap.bind('ctrl+,', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = _.findIndex(this.tasks, {current: true})
      index = (index === 0)
        ? this.tasks.length - 1
        : index - 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+.', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = _.findIndex(this.tasks, {current: true})
      index = (index === this.tasks.length - 1)
        ? 0
        : index + 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+backspace', () => {
      this.deleteTask(_.findIndex(this.tasks, {current: true}))
    })
    Mousetrap.bind('ctrl+c', () => {
      this.completeTask(_.findIndex(this.tasks, {current: true}), !(_.find(this.tasks, {current: true}).complete))
    })
    Mousetrap.bind('ctrl+command+down', () => {
      const completeIndex = _.findIndex(this.tasks, {complete: true})
      const currentIndex = _.findIndex(this.tasks, {current: true})

      if (completeIndex !== -1) {
        if (!this.tasks[currentIndex].complete && currentIndex === completeIndex - 1) return
      }
      if (currentIndex === this.tasks.length - 1) return

      this.sortTasks(currentIndex, currentIndex + 1)
    })
    Mousetrap.bind('ctrl+command+up', () => {
      const completeIndex = _.findIndex(this.tasks, {complete: true})
      const currentIndex = _.findIndex(this.tasks, {current: true})

      if (completeIndex !== -1) {
        if (this.tasks[currentIndex].complete && currentIndex === completeIndex) return
      }
      if (currentIndex === 0) return

      this.sortTasks(currentIndex, currentIndex - 1)
    })
  },
  ready () {
    this.drake = dragula({
      containers: [this.$els.dragula],
      revertOnSpill: true,
      mirrorContainer: this.$els.dragula,
      moves: (el, source, handle) => {
        if (handle.classList.contains('sort-handle')) return true
        return false
      }
    })
    this._drag(this.drake)
    this._drop(this.drake)
  }
}

</script>