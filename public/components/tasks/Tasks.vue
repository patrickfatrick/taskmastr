<template>
  <div id="content">
    <div class="container">
      <div class="prompt-container">
        <div id="todo-prompt">What needs doing?</div>
        <task-input></task-input>
      </div>
      <menu-toggle></menu-toggle>
      <items></items>
      <div id="no-list" v-if="user.key || !current.items">
        <i id="loading" class="fa fa-cog fa-spin"></i>
        <div>You're not viewing a list. Please click on one in the menu to the left.</div>
      </div>
    </div>
  </div>
</template>

<script>

import { mountList } from '../../store/list-store/list-actions'
import MenuToggle from '../misc/MenuToggle.vue'
import TaskInput from './task-components/TaskInput.vue'
import Items from './task-components/Items.vue'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      current: (state) => state.current
    },
    actions: {
      mountList
    }
  },
  components: {
    MenuToggle,
    TaskInput,
    Items
  },
  route: {
    data (transition) {
      this.mountList(transition.to.params.listid)
    }
  }
}

</script>