<template>
  <div id="task-list" class="table" v-show='tasks'>
    <div class="table-body" v-el:dragula>
      <div v-for="task in tasks" class="task table-row" name="task{{$index + 1}}" v-bind:class="{'deleting': task._delete, 'complete': task.complete, 'active': task.current}" v-on:dblclick.prevent="toggleDetails($index, true)" transition="item">
        <div class="table-header">
          <input class="check" type="checkbox" v-model="task.complete"></input>
          <button class="complete" title="Complete task" v-on:click.prevent="completeTask($index, !task.complete)">
            <i class="fa" v-bind:class="{'fa-check-circle': task.complete, 'fa-circle-o': !task.complete}"></i>
          </button>
        </div>
        <div class="task-cell table-data" v-on:click="setCurrentTask($index)">
          <span class="name">{{task.item}}</span>
        </div>
        <div class="utils table-data">
          <button class="details-button" title="Toggle details pane" v-on:click.prevent="toggleDetails($index, true)" v-bind:class="{'active': task.dueDate, 'overdue': task._dueDateDifference < 0, 'due': task._dueDateDifference === 0}">
            <i class="fa" v-bind:class="{'fa-pencil-square-o': !task._dueDateDifference || task._dueDateDifference > 0, 'fa-exclamation-triangle': task._dueDateDifference < 0}"></i>
          </button>
          <button class="sort-button" title="Sort task">
            <i class="sort-handle fa fa-arrows-v"></i>
          </button>
          <button class="delete-button" title="Delete task" v-on:click.prevent="deleteTask($index)">
            <i class="fa" v-bind:class="{'fa-trash-o': !task._delete, 'fa-undo': task._delete}"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <item-details v-for="task in tasks" :task="task" :index="$index"></item-details>
</template>

<script>

import _ from 'lodash'
import dragula from 'dragula'
import Mousetrap from 'mousetrap'
import store from '../../../store/store'
import ItemDetails from './ItemDetails.vue'

export default {
  data () {
    return {
      drake: dragula({
        revertOnSpill: true,
        moves: (el, source, handle) => {
          if (handle.classList.contains('sort-handle')) return true
          return false
        }
      }),
      dragStart: null
    }
  },
  components: {
    ItemDetails
  },
  computed: {
    tasks () {
      return store.state.user.current.items
    },
    deleteAgendas () {
      return store.state.deleteAgendas
    }
  },
  methods: {
    setCurrentTask: store.actions.setCurrentTask,
    deleteTask: store.actions.deleteTask,
    completeTask: store.actions.completeTask,
    sortTasks: store.actions.sortTasks,
    setSaveButton: store.actions.setSaveButton,
    toggleDetails: store.actions.toggleDetails,
    _drag (drake) {
      drake.on('drag', el => {
        this.dragStart = this._index(el)
      })
    },
    _drop (drake) {
      drake.on('drop', el => {
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
  ready () {
    this.drake.containers = [this.$els.dragula]
    this._drag(this.drake)
    this._drop(this.drake)

    // Keyboard bindings
    Mousetrap.bind('up', e => {
      e.preventDefault()
      let index = _.findIndex(this.tasks, {current: true})
      index = (index === 0)
        ? 0
        : index - 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('down', e => {
      e.preventDefault()
      let index = _.findIndex(this.tasks, {current: true})
      index = (index === this.tasks.length - 1)
        ? this.tasks.length - 1
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
      if (currentIndex === this.tasks.length) return

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
  }
}

</script>