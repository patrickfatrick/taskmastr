<template>
  <div>
    <div id="task-list"
      class="table"
      v-show='allTasks'>
      <div
        id="active-tasks"
        class="table-body"
        ref="dragula">
        <item
          v-for="task in activeTasks"
          :key="task._id" 
          :task="task"
          :currenttask="currenttask">
        </item>
      </div>
      <div 
        id="clear-complete-button-container"
        v-if="completeTasks.length">
        <button 
          id="clear-complete-button"
          :class="{'deleting': deleteAllCompleteTasksTimeout}"
          @click.prevent="setDeleteTimeout">
          {{deleteAllCompleteTasksTimeout ? 'Undo' : 'Clear complete items'}}
        </button>
      </div>
      <div
        id="complete-tasks"
        class="table-body"
        v-show="!hideCompleteTasks">
        <item 
          v-for="task in completeTasks" 
          :key="task._id"
          class="task table-row" 
          :class="{'deleting': task._deleting, 'complete': task.complete, 'active': task.current}" 
          :task="task"
          :currenttask="currenttask"
          >
        </item>
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

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../../stylesheets/variables";
  @import "../../../stylesheets/mixins";
  
  #task-list {
    @include table;
    position: relative;
    margin-top: 1rem;
    margin-bottom: 5rem;
    // fixes for safari
    float: none !important;
    &:last-child {
      margin-right: auto !important;
    }
    @include fill-parent();
    @media screen and (min-width: $medium) {
      width: 700px;
    }
    @media screen and (min-width: $large) {
      width: 800px;
    }
  }

  #clear-complete-button-container {
    text-align: center;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: 1rem;
    button {
      text-transform: lowercase;
      color: $white;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 0.3rem;
      border-radius: 4px;
      border: 1px solid $completeGray * 0.6;
      &:active {
        background-color: rgba(0, 0, 0, 0.4);
      }
      &.deleting {
        background-color: $sunsetOrange * 0.8;
      }
      &:active.deleting {
        background-color: $sunsetOrange * 0.6;
      }
    }
  }
</style>

<script>
import dragula from 'dragula'
import { mapGetters, mapActions } from 'vuex'
import Item from './Item.vue'
import ItemDetails from './ItemDetails.vue'
import dragulaMixin from '../../mixins/dragula-mixin'

export default {
  computed: mapGetters({
    activeTasks: 'getActiveTasks',
    completeTasks: 'getCompleteTasks',
    allTasks: 'getAllTasks'
  }),
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
  props: {
    currenttask: String
  },
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
