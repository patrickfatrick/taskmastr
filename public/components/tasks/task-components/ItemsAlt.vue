<template>
  <div>
    <div id="task-list" class="table" v-show='allTasks'>
      <div class="table-body" ref="dragula">
        <item v-for="task in activeTasks" :key="task.id" class="task table-row" :class="{'deleting': task._deleting, 'complete': task.complete, 'active': task.current}" :task="task">
        </item>
      </div>
      <div id="clear-complete-button-container">
        <button id="clear-complete-button">Clear all complete items</button>
      </div>
      <div class="table-body">
        <item v-for="task in completeTasks" :key="task.id" class="task table-row" :class="{'deleting': task._deleting, 'complete': task.complete, 'active': task.current}" :task="task">
        </item>
      </div>
    </div>
    <item-details v-for="(task, index) in allTasks" :index="index" :task="task"></item-details>
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
  components: {
    Item,
    ItemDetails
  },
  mixins: [
    dragulaMixin
  ],
  methods: {
    ...mapActions([
      'sortTasks'
    ]),
    sortFunction (oldIndex, newIndex) {
      return this.sortTasks({ oldIndex, newIndex })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drake = dragula({
        containers: [this.$refs.dragula],
        revertOnSpill: true,
        mirrorContainer: this.$refs.dragula
      })
      this._drag(this.drake)
      this._drop(this.drake)
      this._restrict(this.$refs.dragula)
    })
  }
}
</script>
