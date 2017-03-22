<template>
  <div id="content">
    <warning-banner></warning-banner>
    <div class="container">
      <div class="prompt-container">
        <div id="todo-prompt">What needs doing?</div>
        <task-input></task-input>
      </div>
      <menu-toggle></menu-toggle>
      <items :currenttask="currentItem"></items>
      <div id="no-list" v-if="user.key || !current.items">
        <i id="loading" class="fa fa-cog fa-spin"></i>
        <div id="invalid-list" v-if="invalidList">{{ invalidList }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../stylesheets/variables";
  @import "../../stylesheets/mixins";

  #content {
    height: 100%;
    transition: margin-left 200ms ease-out;
  }

  #content.menued {
    @media screen and (min-width: $medlarge) {
      margin-left: 250px;
    }
  }

  .container {
    @extend html;
    position: initial;
    padding-top: 10%;
    overflow: scroll;
    @include center;
    @include outer-container;
    @media screen and (min-width: $medlarge) {
      position: relative;
    }
  }

  .container#four-oh-four {
    h1 {
      padding-bottom: 0.6rem !important;
      font-size: 2rem;
    }
    iframe {
      width: 320px;
      height: 180px;
      @media screen and (min-width: $small) {
        width: 384px;
        height: 216px;
      }

      @media screen and (min-width: $medium) {
        width: 560px;
        height: 315px;
      }
    }
  }

  #todo-prompt {
    margin-bottom: 15px;
    margin-top: -5px;
    font-size: 2.2rem;
    @include center;
    @include span-columns(14 of 14);
    @media screen and (min-width: $medsmall) {
      margin-bottom: 10px;
      margin-top: 0;
      font-size: 2.5rem;
    }
    @media screen and (min-width: $medium) {
      @include span-columns(8 of 14);
      @include shift(3 of 14);
    }
  }

  .prompt-container {
    @include outer-container;
    @include fill-parent();
    @media screen and (min-width: $medium) {
      width: 700px;
    }
    @media screen and (min-width: $large) {
      width: 800px;
    }
  }
</style>

<script>
import { mapState, mapActions } from 'vuex'
import MenuToggle from '../misc/MenuToggle.vue'
import TaskInput from './task-components/TaskInput.vue'
import Items from './task-components/Items.vue'
import WarningBanner from '../misc/WarningBanner.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    current: (state) => state.current,
    currentItem: (state) => state.current.currentItem,
    invalidList: (state) => state.invalidList
  }),
  components: {
    MenuToggle,
    TaskInput,
    Items,
    WarningBanner
  },
  methods: {
    ...mapActions([
      'mountList',
      'confirmListUser'
    ]),
    routeWatcher () {
      if (this.$route.query.newuser) {
        this.confirmListUser({
          listid: this.$route.params.listid,
          username: this.$route.query.newuser.toLowerCase()
        })
        this.$router.push('/app/list/' + this.$route.params.listid)
      }
      this.mountList(this.$route.params.listid)
    }
  },
  watch: {
    '$route': 'routeWatcher'
  },
  mounted () {
    // Wait until we actually have access to the username, otherwise this will throw an error in user-service
    this.$nextTick(() => {
      this.routeWatcher()
    })
  }
}
</script>
