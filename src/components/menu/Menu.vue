<template>
  <div id="menu" v-bind:class="{'toggled': menuToggled}">
    <div id="menu-tools">
      <div id="wiki-container">
        <a :href="wiki" target="_blank">
          <i class="fa fa-map-o" />
        </a>
      </div>
      <div id="repo-container">
        <a :href="repo" target="_blank">
          <i class="fa fa-github-alt" />
        </a>
      </div>
      <div id="darkmode-container">
        <darkmode />
      </div>
    </div>
    <div id="list-headline">Lists</div>
    <list-input />
    <lists />
    <logout :menuToggled="menuToggled" />
  </div>
</template>

<style lang="postcss" scoped>
  @import "../../stylesheets/variables";

  #menu {
    height: 100%;
    width: 250px;
    top: 0;
    position: fixed;
    background: var(--orchid);
    z-index: 4;
    left: -250px;
    visibility: hidden;
    color: var(--white);
    padding: 0 0 2rem;
    overflow-y: scroll;
    transition: all 200ms ease-out;
  }

  #menu.toggled {
    left: 0;
    visibility: visible;
    box-shadow: rgba(0, 0, 0, 0.3) 9px 0 70px, rgba(0, 0, 0, 0.22) 5px 0 30px;
  }

  #list-headline {
    font-family: var(--cardo);
    font-size: 2rem;
    lost-column: 14/14;
  }

  #menu-tools {
    color: var(--white);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;

    @media (--medLarge) {
      margin-bottom: 2rem;
    }
  }

  #wiki-container {
    lost-column: 1/3;
    padding: 0.5rem;
  }

  #repo-container {
    lost-column: 1/3;
    padding: 0.5rem;
  }

  #darkmode-container {
    lost-column: 1/3;
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