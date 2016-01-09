<template>
	<div id="icon-menu" v-bind:class="{'toggled': menuToggled}">
		<i class="fa fa-bars" v-on:click="setMenuToggled(!menuToggled)"></i>
	</div>
</template>

<script>

import Mousetrap from 'mousetrap';
import store from '../../store/store';

export default {
	computed: {
		menuToggled () {
			return store.state.menuToggled;
		}
	},
	methods: {
		setMenuToggled: store.actions.setMenuToggled
	},
	ready () {
		Mousetrap.bind('alt+right', () => {
			return this.setMenuToggled(true);
		});
		Mousetrap.bind('alt+left', () => {
			return this.setMenuToggled(false);
		});
	}
};

</script>