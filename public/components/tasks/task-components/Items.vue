<template>
  <table id="task-list" v-show='tasks'>
    <thead>
      <tr>
        <th>checkbox</th>
        <th>name</th>
        <th>toggle</th>
        <th>utils</th>
      </tr>
    </thead>
    <tbody v-el:dragula>
      <tr v-for="task in tasks" class="task" v-bind:class="{'deleting': task.delete, 'complete': task.complete, 'active': task.current}" name="task{{$index + 1}}" transition="item">
        <th>
          <input class="check" type="checkbox" v-model="task.complete"></input>
          <i class="complate fa" v-bind:class="{'fa-check-circle': task.complete, 'fa-circle-o': !task.complete}" v-on:click="completeTask($index, !task.complete)"></i>
        </th>
        <td class="task-cell" v-on:click="setCurrentTask($index)">
          <input class="rename" type="text" v-model="task.item" v-show="renameToggled === $index" v-on:keyup.enter="renameToggle(null)" v-on:blur="renameToggle(null)" v-on:change="setSaveButton(true)"></input>
          <span class="name" v-show="renameToggled !== $index" v-on:dblclick="renameToggle($index)">{{task.item}}</span>
        </td>
        <td class="utils">
          <datepicker :task="task" :index="$index"></datepicker>
          <i class="fa fa-arrows-v sort"></i>
          <i class="fa fa-pencil rename-button" v-on:click="renameToggle($index)"></i>
          <i class="fa" v-bind:class="{'fa-trash-o': !task.delete, 'fa-undo': task.delete}" v-on:click="deleteTask($index)"></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

import _ from 'lodash'
import dragula from 'dragula'
import Mousetrap from 'mousetrap'
import store from '../../../store/store'
import Datepicker from './Datepicker.vue'

export default {
  data () {
    return {
      renameToggled: null,
      drake: dragula({
        revertOnSpill: true,
        moves: (el, source, handle) => {
          if (handle.classList.contains('sort')) return true
          return false
        }
      }),
      dragStart: null
    }
  },
  components: {
    Datepicker
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
    renameToggle (index) {
      if (this.renameToggled === index) {
        this.renameToggled = null
        return
      }
      this.renameToggled = index
    },
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
      index = (index === 0) ? 0 : index - 1
      return this.setCurrentTask(index)
    })
    Mousetrap.bind('down', e => {
      e.preventDefault()
      let index = _.findIndex(this.tasks, {current: true})
      index = (index === this.tasks.length - 1) ? this.tasks.length - 1 : index + 1
      return this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+backspace', () => {
      return this.deleteTask(_.findIndex(this.tasks, {current: true}))
    })
    Mousetrap.bind('ctrl+c', () => {
      return this.completeTask(_.findIndex(this.tasks, {current: true}), !(_.find(this.tasks, {current: true}).complete))
    })
    Mousetrap.bind('ctrl+/', () => {
      return this.renameToggle(_.findIndex(this.tasks, {current: true}))
    })
    Mousetrap.bind('ctrl+command+down', () => {
      const completeIndex = _.findIndex(this.tasks, {complete: true})
      const currentIndex = _.findIndex(this.tasks, {current: true})

      if (completeIndex !== -1) {
        if (!this.tasks[currentIndex].complete && currentIndex === completeIndex - 1) return
      }
      if (currentIndex === this.tasks.length) return

      return this.sortTasks(currentIndex, currentIndex + 1)
    })
    Mousetrap.bind('ctrl+command+up', () => {
      const completeIndex = _.findIndex(this.tasks, {complete: true})
      const currentIndex = _.findIndex(this.tasks, {current: true})

      if (completeIndex !== -1) {
        if (this.tasks[currentIndex].complete && currentIndex === completeIndex) return
      }
      if (currentIndex === 0) return

      return this.sortTasks(currentIndex, currentIndex - 1)
    })
  }
}

</script>