<template>
	<div id="icon-menu" v-bind:class="{'toggled': menuToggled}">
		<i class="fa fa-bars" v-on:click="setMenuToggled(!menuToggled)"></i>
	</div>
</template>

<script>

import store from '../../store/store';

export default {
	computed: {
		menuToggled () {
			return store.state.menuToggled;
		}
	},
	methods: {
		setMenuToggled: store.actions.setMenuToggled
	}
};

</script>