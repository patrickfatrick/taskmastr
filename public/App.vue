<template>
	<div id="app-container" v-bind:class="{'darkmode': darkmode}">
		<modal></modal>
		<menu></menu>
		<content></content>
	</div>
</template>

<script>

import store from './store/store';
import Modal from './components/Modal.vue';
import Menu from './components/Menu.vue';
import Content from './components/Content.vue';

export default {
	computed: {
		darkmode () {
			return store.state.user.darkmode;
		}
	},
	ready () {
		return store.actions.getSession();
	},
	components: {
		Modal,
		Menu,
		Content
	}
};

</script>