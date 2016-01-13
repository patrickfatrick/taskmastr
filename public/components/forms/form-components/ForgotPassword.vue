<template>
	<div id="forgot-password">
		<input id="forgot" class="check" name="forgot" type="checkbox" v-model="forgot"></input>
		<i class="fa" v-bind:class="{'fa-check-square-o': forgot, 'fa-square-o': !forgot}" v-on:click="toggleCheckbox('forgot')"></i>
		<label for="forgot">Forgot your password?</label>
	</div>
</template>

<script>

import store from '../../../store/store';

export default {
	computed: {
		forgot () {
			return store.state.forgot;
		}
	},
	methods: {
		toggleCheckbox: store.actions.toggleCheckbox
	}
};

</script>