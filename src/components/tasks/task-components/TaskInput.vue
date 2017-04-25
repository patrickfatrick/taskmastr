<template>
  <form 
    class="prompt-line prompt-line--item-line"
    name="itemForm"
    novalidate
    @submit.prevent="addNewTask(newTask.trim())"
  >
    <input
      class="prompt-line__prompt random-placeholder mousetrap"
      type="text"
      title="Item Input"
      :value="newTask"
      @change="setNewTask($event.target.value)"
      :class="{
        'prompt-line__prompt--invalid': !isValid && taskAttempt,
        'prompt-line__prompt--darkmode': darkmode
      }"
      :placeholder="placeholder"
      ref="taskinput"
    />
    <div class="prompt-line__button-container">
      <button
        class="prompt-line__submit"
        title="Create task"
        type="submit">
        <i class="fa fa-arrow-down " />
      </button>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.prompt-line--item-line {
  @apply --promptLine;

  margin-bottom: 1.5rem;
  lost-column: 13/14;
  lost-offset: 1/14;
  lost-utility: clearfix;

  @media (--medium) {
    lost-column: 12/14;
    lost-offset: 1/14;
  }

  & .prompt-line__prompt {
    lost-column: 11/14;

    &:not(.prompt-line__prompt--darkmode) {
      &:focus {
        border-color: var(--sunray);
      }
    }

    &.prompt-line__prompt--darkmode {
      &:focus {
        border-color: var(--astroTurf);
      }
    }

    @media (--medium) {
      lost-column: 11/12;
    }
  }

  & .prompt-line__button-container {
    text-align: left;
    lost-column: 3/14;

    @media (--medium) {
      text-align: center;
      lost-column: 1/12;
    }
  }

  & .prompt-line__submit {
    @apply --buttonEffectOrchid;

    font-size: 1.8rem;
    width: 2.4rem;
    position: relative;
    margin-left: 0.5rem;
    cursor: pointer;
    color: var(--white);
    background: var(--orchid);
    border-radius: 50%;
    padding: 1px 3px 3px 4px;
  }
}
</style>

<script>
import { hashish } from 'harsh'
import Mousetrap from 'mousetrap'
import { resetLocal, addTime } from 'gregorian'
import datejs from 'date.js'
import { mapState, mapActions } from 'vuex'
import extractDate from '../../../helper-utilities/extract-date'
import placeholders from '../../../helper-utilities/placeholders'
import { setDateTo6am, reformISO } from '../../../helper-utilities/utils'

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      current: (state) => state.current,
      currentItem: (state) => state.current.currentItem,
      newTask: (state) => state.newTask,
      taskAttempt: (state) => state.taskAttempt,
      placeholder: (state) => state.placeholder,
      darkmode: (state) => state.user.darkmode
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
            dueDate = reformISO(setDateTo6am(datejs('tomorrow')))
            task = extractDate(task).item
            break
          case '/w':
            dueDate = reformISO(setDateTo6am(datejs('next Monday')))
            task = extractDate(task).item
            break
          case '/m':
            dueDate = reformISO(
              setDateTo6am(
                addTime('m')(1)(
                  resetLocal('m')()
                )
              )
            )
            task = extractDate(task).item
            break
          case '/y':
            dueDate = reformISO(
              setDateTo6am(
                addTime('y')(1)(
                  resetLocal('y')()
                )
              )
            )
            task = extractDate(task).item
            break
          default:
            dueDate = reformISO(
              setDateTo6am(
                resetLocal('d')(extractDate(task).dueDate)
              )
            )
            task = extractDate(task).item
            break
        }
      } else {
        dueDate = null
      }
      this.addTask({
        _id: hashish(),
        item: task.replace(/^\w/g, task.charAt(0).toUpperCase()),
        createdBy: this.user.username,
        complete: false,
        dateCreated: reformISO(),
        dueDate: dueDate,
        dateCompleted: null,
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