<template>
  <div id="content">
    <div id="test-user-banner" v-if="user.username === 'mrormrstestperson@taskmastr.co'">
      FYI: You're currently logged into the Try It account, and changes will not be saved.
    </div>
    <div class="container">
      <div class="prompt-container">
        <div id="todo-prompt">What needs doing?</div>
        <task-input></task-input>
      </div>
      <menu-toggle></menu-toggle>
      <items></items>
      <div id="no-list" v-if="user.key || !current.items">
        <i id="loading" class="fa fa-cog fa-spin"></i>
        <div id="invalid-list" v-if="invalidList">{{ invalidList }}</div>
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
      current: (state) => state.current,
      invalidList: (state) => state.invalidList
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