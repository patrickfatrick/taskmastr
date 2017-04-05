<template>
  <div>
    <transition name="mask">
      <div 
        class="mask"
        @click="toggleDetails(index)"
        v-if="detailsToggled === index"
      />
    </transition>
    <div class="task-details-container" v-show="detailsToggled === index">
      <transition name="details">
        <div
          class="task-details"
          :class="{'toggled': detailsToggled === index}"
          v-if="detailsToggled === index"
        >
          <button
            class="task-details__close"
            @click.prevent="toggleDetails(index)"
          >
            <i class="fa fa-times" />
          </button>
          <div class="task-details__task-name-container">
            <input
              class="task-details__task-name-container__task-name mousetrap"
              type="text"
              :value="task.item"
              @change="rename($event, index)"
            />
          </div>
          <div class="task-details__task-info-container task-details__task-info-container--dates">
            <div class="task-details-panel task-details__task-info-container__task-create">
              <span class="task-details-panel__task-label">
                Created on
              </span>
              {{reformatDate(task.dateCreated)}}
              <br>
              <span class="task-details-panel__task-label">
                by {{(task.createdBy === username) ? 'You' : task.createdBy}}
              </span>
            </div>
            <div
              class="task-details-panel task-details__task-info-container__task-complete"
              v-show="task.dateCompleted"
            >
              <span class="task-details-panel__task-label">
                Completed on
              </span>
              {{reformatDate(task.dateCompleted)}}
              <br>
              <span class="task-details-panel__task-label">
                by {{(task.completedBy === username) ? 'You' : task.completedBy}}
              </span>
            </div>
            <div
              class="task-details-panel task-details__task-info-container__task-due"
              v-show="!task.complete"
            >
              <span
                class="task-details-panel__task-label"
                v-show="task.dueDate"
              >
                Due on
              </span>
              {{(task.dueDate) ? reformatDate(task.dueDate) + '&nbsp;' : ''}}
              <span
                class="task-details-panel__task-label"
                v-show="!task.dueDate"
              >
                Set a due date&nbsp;
              </span>
              <datepicker
                :task="task"
                :index="index"
              />
            </div>
            <div
              class="task-details-panel task-details__task-info-container__human-readable"
              v-show="!task.complete"
            >
              <div
                class="human-readable__due-in"
                v-show="task._dueDateDifference > 0"
              >
                <span v-show="task._dueDateDifference > 1">
                  <span class="task-details-panel__task-label">which is</span>
                  {{task._dueDateDifference}}&nbsp;days&nbsp;
                  <span class="task-details-panel__task-label">from now</span>
                </span>
                <span v-show="task._dueDateDifference === 1">
                  <span class="task-details-panel__task-label">which is</span>
                  tomorrow
                </span>
              </div>
              <div
                class="human-readable__overdue"
                v-show="task._dueDateDifference < 0"
              >
                <span v-show="task._dueDateDifference < -1">
                  <span class="task-details-panel__task-label">which was</span>
                  {{-task._dueDateDifference}}&nbsp;days&nbsp;
                  <span class="task-details-panel__task-label">ago</span>
                </span>
                <span v-show="task._dueDateDifference === -1">
                  <span class="task-details-panel__task-label">which was</span>
                  yesterday
                </span>
              </div>
              <div
                class="human-readable__due-today"
                v-show="task._dueDateDifference === 0"
              >
                <span class="task-details-panel__task-label">which is</span>
                today
              </div>
            </div>
          </div>
          <notes
            :task="task"
            :index="index"
            :detailsToggled="detailsToggled"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.mask {
  @apply --mask;
}

.task-details-container {
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: scroll;
}

.details-enter-active {
  animation: bounceInDown 250ms;
}

.details-leave-active {
  animation: bounceOutUp 250ms;
}

.task-details {
  @apply --center;

  position: absolute;
  background: color(var(--gray) lightness(90%));
  color: color(var(--gray) shade(40%));
  padding: 0.5rem 0.7rem 3rem;
  border: 1px solid var(--gray);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 19px 60px, rgba(0, 0, 0, 0.22) 0 15px 20px;
  top: 0;
  min-height: 100%;
  z-index: 7;
  overflow-y: scroll;
  left: 0;
  right: 0;

  @media (--medium) {
    width: 768px;
  }

  @media (height >= 700px) {
    top: 3rem;
    min-height: 600px;
    margin-bottom: 2rem;
  }

  @media (height >= 800px) {
    min-height: 700px;
  }

  & .task-details__close {
    margin-top: 1rem;
    float: right;
    color: var(--gray);

    @media (--medium) {
      margin-top: 0;
    }
  }

  & .task-details__task-name-container {
    padding: 0 2rem;
    width: 100%;
    margin-top: 1rem;

    & .task-details__task-name-container__task-name {
      width: 100%;
      margin-bottom: 0.5rem;
      border: none;
      background: transparent;
      border-bottom: 4px solid var(--slateGray);
      transition: border-color 500ms ease-out;

      &:focus {
        border-color: var(--deepBlue) !important;
      }

      &::selection {
        background: var(--deepBlue);
        color: var(--white);
      }
    }
  }

  & .task-details__task-info-container {
    padding: 1rem 2rem 0;
    text-align: left;
    line-height: 1.4rem;
    lost-utility: clearfix;

    & .task-details-panel {
      @media (--medium) {
        lost-column: 4/12;
      }

      .human-readable__overdue {
        color: var(--sunsetOrange);
      }

      .human-readable__due-today {
        color: var(--grassStain);
      }
    }
  }

  & .task-details-panel__task-label {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
}
</style>

<script>
import _ from 'lodash'
import Mousetrap from 'mousetrap'
import gregorian from 'gregorian'
import { mapState, mapActions } from 'vuex'
import Datepicker from './Datepicker.vue'
import Notes from './Notes.vue'

export default {
  computed: mapState({
    username: (state) => state.user.username,
    tasks: (state) => state.current.items,
    detailsToggled: (state) => state.detailsToggled
  }),
  components: {
    Datepicker,
    Notes
  },
  props: {
    index: Number,
    task: Object
  },
  methods: {
    ...mapActions([
      'toggleDetails',
      'setDueDateDifference',
      'renameTask'
    ]),
    rename (e, index) {
      if (!e.target.value) {
        e.target.value = this.task.item
        return
      }
      this.renameTask({ index, name: e.target.value.trim() })
    },
    reformatDate (date) {
      return gregorian.reform(date).to('M d, yyyy')
    }
  },
  mounted () {
    this.setDueDateDifference({ index: this.index, dueDate: this.task.dueDate })

    // Keyboard bindings
    Mousetrap.bind('ctrl+d', () => {
      this.toggleDetails(_.findIndex(this.tasks, { current: true }))
    })
  }
}
</script>