<template>
  <form id="todo-line" class="prompt-line" name="todoForm" novalidate @submit.prevent="addNewTask(newTask.trim())">
    <input id="create-todo" class="prompt random-placeholder mousetrap" type="text" title="Task Input" :value="newTask" @change="setNewTask($event.target.value)" :class="{'invalid': !isValid && taskAttempt}" :placeholder="placeholder" ref="taskinput"></input>
    <div class="button-container">
      <button id="task-button" class="submit" title="Create task" type="submit">
        <i class="fa fa-arrow-down "></i>
      </button>
    </div>
  </form>
</template>

<script>
import { hashish } from 'harsh'
import Mousetrap from 'mousetrap'
import gregorian from 'gregorian'
import date from 'date.js'
import { mapState, mapActions } from 'vuex'
import extractDate from '../../../helper-utilities/extract-date'
import placeholders from '../../../helper-utilities/placeholders'

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      current: (state) => state.current,
      currentItem: (state) => state.current.currentItem,
      newTask: (state) => state.newTask,
      taskAttempt: (state) => state.taskAttempt,
      placeholder: (state) => state.placeholder
    }),
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
    ...mapActions([
      'setNewTask',
      'setPlaceholder',
      'setTaskAttempt',
      'addTask',
      'setCurrentTask'
    ]),
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
        _id: hashish(),
        item: task.replace(/^\w/g, task.charAt(0).toUpperCase()),
        createdBy: this.user.username,
        complete: false,
        dateCreated: gregorian.reform(new Date()).to('iso'),
        dueDate: dueDate,
        dateCompleted: '',
        completedBy: '',
        notes: '',
        _dueDateDifference: null,
        _deleting: false,
        _detailsToggled: false
      })
      if (!this.currentItem) this.setCurrentTask(0)
      this.setTaskAttempt(false)
      this.setNewTask('')
      this.setPlaceholder(placeholders.list[Math.floor(Math.random() * placeholders.list.length)])
    }
  },
  mounted () {
    this.setPlaceholder(placeholders.list[Math.floor(Math.random() * placeholders.list.length)])

    // Keyboard bindings
    Mousetrap.bind('ctrl+f', (e) => {
      e.preventDefault()
      this.$refs.taskinput.focus()
    })
  }
}
</script>