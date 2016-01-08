<template>
	<div id="remember">
		<input id="remember-me" class="check" name="remember-me" type="checkbox" v-model="rememberMe"></input>
		<i class="fa" v-bind:class="{'fa-check-square-o': rememberMe, 'fa-square-o':!rememberMe}" v-on:click="toggleCheckbox('rememberMe')"></i>
		<label for="remember-me">Remember me</label>
	</div>
</template>

<script>

import store from '../../store/store';

export default {
	computed: {
		rememberMe () {
			return store.state.rememberMe;
		}
	},
	methods: {
		toggleCheckbox: store.actions.toggleCheckbox
	}
};

</script>