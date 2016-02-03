<template>
  <form id="todo-line" class="prompt-line" name="todoForm" novalidate @submit.prevent="addNewTask(newTask.trim())">
    <input id="create-todo" class="prompt random-placeholder mousetrap" type="text" name="todoInput" :value="newTask" @change="setNewTask($event.target.value)" :class="{'invalid': !isValid && taskAttempt}" placeholder="{{placeholder}}" v-el:taskinput></input>
    <div class="button-container">
      <button id="task-button" class="submit" title="Create task" type="submit">
        <i class="fa fa-arrow-down "></i>
      </button>
    </div>
  </form>
</template>

<script>

import _ from 'lodash'
import hat from 'hat'
import Mousetrap from 'mousetrap'
import gregorian from 'gregorian'
import date from 'date.js'
import store from '../../../store/store'
import extractDate from '../../../helper-utilities/extract-date'

export default {
  computed: {
    user () {
      return store.state.user
    },
    newTask () {
      return store.state.newTask
    },
    taskAttempt () {
      return store.state.taskAttempt
    },
    placeholder () {
      return store.state.placeholder
    },
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
    setNewTask: store.actions.setNewTask,
    setTaskAttempt: store.actions.setTaskAttempt,
    setSaveButton: store.actions.setSaveButton,
    setTaskDueDate: store.actions.setTaskDueDate,
    setDueDateDifference: store.actions.setDueDateDifference,
    addTask: store.actions.addTask,
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
        id: hat(),
        item: task,
        current: !(_.find(this.user.current.items, {current: true})),
        complete: false,
        dateCreated: gregorian.reform(new Date()).to('iso'),
        dueDate: dueDate,
        notes: '',
        _dueDateDifference: null,
        _delete: false,
        _detailsToggled: false
      })
      this.setTaskAttempt(false)
      this.setNewTask('')
      this.setSaveButton(true)
    }
  },
  ready () {
    Mousetrap.bind('ctrl+f', (e) => {
      e.preventDefault()
      this.$els.taskinput.focus()
    })
  }
}

</script>