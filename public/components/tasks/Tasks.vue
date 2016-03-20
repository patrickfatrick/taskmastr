<template>
  <div id="content">
    <div class="container">
      <div class="prompt-container">
        <div id="todo-prompt">What needs doing?</div>
        <task-input></task-input>
      </div>
      <menu-toggle></menu-toggle>
      <items></items>
      <div class="no-list" v-if="user.key || !user.current.items">
        <i id="loading" class="fa fa-cog fa-spin"></i>
        <div>You're not viewing a list. Please click on one in the menu to the left.</div>
      </div>
    </div>
    <save></save>
  </div>
</template>

<script>

import store from '../../store/store'
import MenuToggle from '../misc/MenuToggle.vue'
import TaskInput from './task-components/TaskInput.vue'
import Items from './task-components/Items.vue'
import Save from '../misc/Save.vue'

export default {
  computed: {
    user () {
      return store.state.user
    }
  },
  components: {
    MenuToggle,
    TaskInput,
    Items,
    Save
  },
  methods: {
    setCurrentList: store.actions.setCurrentList
  },
  route: {
    data (transition) {
      console.log(transition)
      this.setCurrentList(transition.to.params.listid)
    }
  }
}

</script>