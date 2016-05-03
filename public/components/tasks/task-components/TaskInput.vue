<template>
  <form id="todo-line" class="prompt-line" name="todoForm" novalidate @submit.prevent="addNewTask(newTask.trim())">
    <input id="create-todo" class="prompt random-placeholder mousetrap" type="text" title="Task Input" :value="newTask" @change="setNewTask($event.target.value)" :class="{'invalid': !isValid && taskAttempt}" placeholder="{{placeholder}}" v-el:taskinput></input>
    <div class="button-container">
      <button id="task-button" class="submit" title="Create task" type="submit">
        <i class="fa fa-arrow-down "></i>
      </button>
    </div>
  </form>
</template>

<script>

import _ from 'lodash'
import { hash } from 'harsh'
import Mousetrap from 'mousetrap'
import gregorian from 'gregorian'
import date from 'date.js'
import { setNewTask, setPlaceholder, setTaskAttempt, setTaskDueDate, setDueDateDifference, addTask } from '../../../store/item-store/item-actions'
import extractDate from '../../../helper-utilities/extract-date'
import placeholders from '../../../helper-utilities/placeholders'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      current: (state) => state.current,
      newTask: (state) => state.newTask,
      taskAttempt: (state) => state.taskAttempt,
      placeholder: (state) => state.placeholder
    },
    actions: {
      setNewTask,
      setPlaceholder,
      setTaskAttempt,
      setTaskDueDate,
      setDueDateDifference,
      addTask
    }
  },
  computed: {
    validate () {
      return {
        newTaskRequired: !!this.newTask.trim()
      }
    },
    isValid () {
      var validation = this.validate
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    addNewTask (task) {
      this.setTaskAttempt(true)
      if (!this.isValid) return
      let dueDate
      if (task.toLowerCase().indexOf('remind me to ') === 0 || task.indexOf('/') === 0) {
        const char = (task.toLowerCase().indexOf('remind me to ') !== -1) ? 13 : 3
        const shortcut = (task.substring(0, char - 1))
        task = task.substring(char, task.length)
        switch (shortcut) {
          case '/t':
            dueDate = gregorian.reform(date('tomorrow')).set(6, 'h').restart('h').to('iso')
            task = extractDate(task).item
            break
          case '/w':
            dueDate = gregorian.reform(date('next Monday')).set(6, 'h').restart('h').to('iso')
            task = extractDate(task).item
            break
          case '/m':
            dueDate = gregorian.reform().restart('m').add(1, 'm').set(6, 'h').restart('h').to('iso')
            task = extractDate(task).item
            break
          case '/y':
            dueDate = gregorian.reform().restart('y').add(1, 'y').set(6, 'h').restart('h').to('iso')
            task = extractDate(task).item
            break
          default:
            dueDate = gregorian.reform(extractDate(task).dueDate).restart('d').set(6, 'h').to('iso')
            task = extractDate(task).item
            break
        }
      } else {
        dueDate = ''
      }
      this.addTask({
        id: hash().hashes[0],
        item: task.replace(/^\w/g, task.charAt(0).toUpperCase()),
        current: !(_.find(this.current.items, {current: true})),
        complete: false,
        dateCreated: gregorian.reform(new Date()).to('iso'),
        dueDate: dueDate,
        dateCompleted: '',
        notes: '',
        _dueDateDifference: null,
        _deleting: false,
        _detailsToggled: false
      })
      this.setTaskAttempt(false)
      this.setNewTask('')
      this.setPlaceholder(placeholders.placeholders[Math.floor(Math.random() * placeholders.placeholders.length)])
    }
  },
  compiled () {
    this.setPlaceholder(placeholders.placeholders[Math.floor(Math.random() * placeholders.placeholders.length)])

    // Keyboard bindings
    Mousetrap.bind('ctrl+f', (e) => {
      e.preventDefault()
      this.$els.taskinput.focus()
    })
  }
}

</script>