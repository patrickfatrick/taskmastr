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
          :key="task.id" 
          :task="task">
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
          :key="task.id" class="task table-row" 
          :class="{'deleting': task._deleting, 'complete': task.complete, 'active': task.current}" 
          :task="task">
        </item>
      </div>
    </div>
    <item-details 
      v-for="(task, index) in allTasks" 
      :index="index" 
      :task="task">
    </item-details>
  </div>
</template>

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
