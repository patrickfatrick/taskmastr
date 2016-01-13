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
// import Modal from './components/Modal.vue';
// import Menu from './components/Menu.vue';
// import Content from './components/Content.vue';
import {extractDate, getUrlVar} from './store/prototypes';

extractDate();
getUrlVar();

export default {
	computed: {
		darkmode () {
			return store.state.user.darkmode;
		},
		auth () {
			return store.state.auth;
		}
	},
	methods: {
		setReset: store.actions.setReset,
		setResetToken: store.actions.setResetToken,
		loginUser: store.actions.loginUser
	},
	ready () {
		store.actions.getSession()
		.then (() => {
			if (this.$route.query.token) this.setResetToken(this.$route.query.token);
			if (this.$route.path.indexOf('/reset') === 0) return this.setReset(true);
			if (this.auth) return this.$route.router.go('/app');
		});
	}
	// ,
	// components: {
	// 	Modal,
	// 	Menu,
	// 	Content
	// }
};

</script>