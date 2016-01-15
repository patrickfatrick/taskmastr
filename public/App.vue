<template>
	<div id="app-container" v-bind:class="{'darkmode': darkmode}">
		<router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
	</div>
</template>

<script>

import store from './store/store';

export default {
	computed: {
		darkmode () {
			return store.state.user.darkmode;
		},
		auth () {
			return store.state.auth;
		}
	},
	ready () {
		store.actions.getSession()
		.then (() => {
			if (this.auth) return this.$route.router.go('/app');
		});
	}
};

</script>