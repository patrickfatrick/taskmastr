<template>
  <div>
    <div
      class="table table--item-list"
      v-show='allTasks'
    >
      <div
        class="table__table-body table__table-body--active-tasks"
        ref="dragula">
        <item
          v-for="task in activeTasks"
          :key="task._id" 
          :task="task"
          :currenttask="currentItem"
          :darkmode="darkmode"
        />
      </div>
      <div 
        class="table--task-list__clear-complete-button-container"
        v-if="completeTasks.length">
        <button 
          class="table--task-list__clear-complete-button-container__button"
          :class="{'table--task-list__clear-complete-button-container__button--deleting': deleteAllCompleteTasksTimeout}"
          @click.prevent="setDeleteTimeout"
        >
          {{deleteAllCompleteTasksTimeout ? 'Undo' : 'Clear complete items'}}
        </button>
      </div>
      <div
        class="table__table-body table__table-body--complete-tasks"
        v-show="!hideCompleteTasks">
        <item 
          v-for="task in completeTasks" 
          :key="task._id"
          :task="task"
          :currenttask="currentItem"
          :darkmode="darkmode"
        />
      </div>
    </div>
    <item-details 
      v-for="(task, index) in allTasks" 
      :key="task._id"
      :index="index" 
      :task="task">
    </item-details>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.table--item-list {
  @apply --table;

  position: relative;
  margin-top: 1rem;
  margin-bottom: 5rem;
  width: 100%;

  /* fixes for safari */
  float: none !important;

  &:last-child {
    margin-right: auto !important;
  }

  @media (--medium) {
    width: 700px;
  }

  @media (--large) {
    width: 800px;
  }
}

.table--task-list__clear-complete-button-container {
  text-align: center;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 1rem;

  & .table--task-list__clear-complete-button-container__button {
    text-transform: lowercase;
    color: var(--white);
    background-color: color(var(--black) alpha(20%));
    padding: 0.3rem;
    border-radius: 4px;
    border: 1px solid color(var(--completeGray) shade(40%));

    &:active {
      background-color: color(var(--black) alpha(40%));
    }

    &.table--task-list__clear-complete-button-container__button--deleting {
      background-color: color(var(--sunsetOrange) shade(20%));
    }

    &:active.table--task-list__clear-complete-button-container__button--deleting {
      background-color: color(var(--sunsetOrange) shade(40%));
    }
  }
}
</style>

<script>
import dragula from 'dragula'
import { mapGetters, mapState, mapActions } from 'vuex'
import Item from './Item.vue'
import ItemDetails from './ItemDetails.vue'
import dragulaMixin from '../../mixins/dragula-mixin'
import { isOwner } from '../../../helper-utilities/utils'

export default {
  computed: {
    ...mapGetters({
      activeTasks: 'getActiveTasks',
      completeTasks: 'getCompleteTasks',
      allTasks: 'getAllTasks'
    }),
    ...mapState({
      currentItem: (state) => {
        return (isOwner(state.current, state.user.username))
          ? state.current.currentItem
          : state.current.users.find((user) => user.username === state.user.username).currentItem
      },
      darkmode: (state) => state.user.darkmode
    })
  },
  data () {
    return {
      deleteAllCompleteTasksTimeout: false,
      hideCompleteTasks: false
    }
  },
  components: {
    Item,
    ItemDetails
  },
  mixins: [
    dragulaMixin
  ],
  methods: {
    ...mapActions([
      'sortTasks',
      'deleteAllCompleteTasks'
    ]),
    sortFunction (oldIndex, newIndex) {
      return this.sortTasks({ oldIndex, newIndex })
    },
    setDeleteTimeout () {
      if (!this.deleteAllCompleteTasksTimeout) {
        let timeout = window.setTimeout(() => {
          this.deleteAllCompleteTasks()
          this.deleteAllCompleteTasksTimeout = false
          this.hideCompleteTasks = false
        }, 5000)
        this.deleteAllCompleteTasksTimeout = timeout
        this.hideCompleteTasks = true
      } else {
        window.clearTimeout(this.deleteAllCompleteTasksTimeout)
        this.deleteAllCompleteTasksTimeout = false
        this.hideCompleteTasks = false
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drake = dragula({
        containers: [this.$refs.dragula],
        revertOnSpill: false,
        mirrorContainer: this.$refs.dragula
      })
      this._drag(this.drake)
      this._drop(this.drake)
      this._restrict(this.$refs.dragula)
    })
  }
}
</script>
