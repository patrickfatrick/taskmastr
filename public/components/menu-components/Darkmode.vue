<template>
	<input class="check" type="checkbox" title="Toggle Darkmode" v-model="darkmode"></input>
	<i id="dark-mode" class="fa" v-bind:class="{'fa-sun-o': darkmode, 'fa-moon-o': !darkmode}" v-on:click="setDarkmode(!darkmode)"></i>
</template>

<script>

import Mousetrap from 'mousetrap';
import store from '../../store/store';

export default {
	computed: {
		darkmode () {
			return store.state.user.darkmode;
		}
	},
	methods: {
		setDarkmode: store.actions.setDarkmode
	},
	ready () {
		Mousetrap.bind('command+m', (e) => {
			e.preventDefault();
			return this.setDarkmode(!this.darkmode);
		});
	}
};

</script>