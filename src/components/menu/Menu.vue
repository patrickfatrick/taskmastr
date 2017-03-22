<template>
  <div id="menu" v-bind:class="{'toggled': menuToggled}">
    <div id="menu-tools">
      <div id="wiki-container">
        <a :href="wiki" target="_blank">
          <i class="fa fa-map-o"></i>
        </a>
      </div>
      <div id="repo-container">
        <a :href="repo" target="_blank">
          <i class="fa fa-github-alt"></i>
        </a>
      </div>
      <div id="darkmode-container">
        <darkmode></darkmode>
      </div>
    </div>
    <div id="list-headline">Lists</div>
    <list-input></list-input>
    <lists></lists>
    <logout></logout>
  </div>
</template>

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../stylesheets/variables";

  #menu {
    height: 100%;
    width: 250px;
    top: 0;
    left: 0;
    position: fixed;
    background: $orchid;
    z-index: 10000;
    left: -250px;
    visibility: hidden;
    color: $white;
    padding: 0 0 2rem 0;
    overflow-y: scroll;
    transition: all 200ms ease-out;
    @include outer-container;
  }

  #menu.toggled {
    left: 0;
    visibility: visible;
    box-shadow: rgba(0, 0, 0, 0.30) 9px 0 70px, rgba(0, 0, 0, 0.22) 5px 0 30px;
    #logout-container {
      left: 0;
    }
  }

  #list-headline {
    font-family: $cardo;
    font-size: 2rem;
    @include span-columns(14 of 14);
  }

  #menu-tools {
    @include fill-parent();
    @include row();
    color: $white;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    @media screen and (min-width: $medlarge) {
      margin-bottom: 2rem;
    }
  }

  #wiki-container {
    @include span-columns(1 of 3);
    padding: 0.5rem;
  }

  #repo-container {
    @include span-columns(1 of 3);
    padding: 0.5rem;
  }

  #darkmode-container {
    @include omega;
    @include span-columns(1 of 3);
    padding: 0.5rem;
  }
</style>

<script>
import { mapState } from 'vuex'
import Darkmode from './menu-components/Darkmode.vue'
import ListInput from './menu-components/ListInput.vue'
import Lists from './menu-components/Lists.vue'
import Logout from '../misc/Logout.vue'

export default {
  computed: mapState({
    menuToggled: (state) => state.menuToggled,
    wiki: (state) => state.wiki,
    repo: (state) => state.repo
  }),
  components: {
    Darkmode,
    ListInput,
    Lists,
    Logout
  }
}
</script>