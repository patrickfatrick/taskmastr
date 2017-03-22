<template>
  <div 
    id="lists-list" 
    class="table" 
    v-show="lists">
    <div 
      class="table-body"
      ref="dragula">
      <div 
        v-for="(list, index) in lists" 
        :key="list._id" class="table-row">
        <list 
          :index="index"
          :list="list">
        </list>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../../stylesheets/mixins";

  #lists-list {
    @include table;
    margin-bottom: 5rem;
    @include fill-parent();
    .table-header {
      display: none;
    }
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
