<template>
  <div 
    class="table table--lists-list" 
    v-show="lists">
    <div 
      class="table__table-body"
      ref="dragula">
      <div 
        v-for="(list, index) in lists" 
        :key="list._id"
      >
        <list 
          :index="index"
          :list="list">
        </list>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.table--lists-list {
  @apply --table;

  margin-bottom: 5rem;
}
</style>

<script>
import dragula from 'dragula'
import { mapState, mapActions } from 'vuex'
import List from './List.vue'
import dragulaMixin from '../../mixins/dragula-mixin'

export default {
  components: {
    List
  },
  computed: mapState({
    lists: (state) => state.user.tasks
  }),
  mixins: [
    dragulaMixin
  ],
  methods: {
    ...mapActions([
      'sortLists'
    ]),
    sortFunction (oldIndex, newIndex) {
      return this.sortLists({ oldIndex, newIndex })
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
