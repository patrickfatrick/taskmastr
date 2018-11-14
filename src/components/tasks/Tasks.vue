<template>
  <div class="container">
    <div class="prompt-container">
      <div class="prompt-container__todo-prompt">Taskmastr</div>
      <task-input />
    </div>
    <menu-toggle />
    <items />
    <div
      class="no-list"
      v-if="user.key || !current.items"
    >
      <i
        class="no-list__loading fa fa-cog fa-spin"
      />
      <div
        class="no-list__invalid"
        v-if="invalidList"
      >
        {{ invalidList }}
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.container {
  @apply --fill;
  @apply --center;

  lost-utility: clearfix;
  position: initial;
  padding-top: 10%;
  padding-bottom: 10%;
  overflow: scroll;

  @media (--medLarge) {
    position: relative;
  }

  &.four-oh-four {
    & h1 {
      padding-bottom: 0.6rem !important;
      font-size: 2rem;
    }

    & iframe {
      width: 320px;
      height: 180px;

      @media (--small) {
        width: 384px;
        height: 216px;
      }

      @media (--medium) {
        width: 560px;
        height: 315px;
      }
    }
  }
}

.prompt-container {
  @apply --center;

  @media (--medium) {
    width: 700px;
  }

  @media (--large) {
    width: 800px;
  }
}

.prompt-container__todo-prompt {
  @apply --center;
  @apply --headline;

  margin-bottom: 15px;
  margin-top: -5px;
  font-size: 2.2rem;
  lost-column: 14/14;

  @media (--medSmall) {
    margin-bottom: 10px;
    margin-top: 0;
    font-size: 2.5rem;
  }

  @media (--medium) {
    lost-column: 8/14;
    lost-offset: 3/14;
  }
}

.no-list {
  lost-column: 12/14;
  lost-offset: 1/14;
}

.no-list__loading {
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 5rem;
}
</style>

<script>
import { mapState } from 'vuex'
import MenuToggle from '../misc/MenuToggle.vue'
import TaskInput from './task-components/TaskInput.vue'
import Items from './task-components/Items.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    current: (state) => state.current,
    invalidList: (state) => state.invalidList
  }),
  components: {
    MenuToggle,
    TaskInput,
    Items
  }
}
</script>
