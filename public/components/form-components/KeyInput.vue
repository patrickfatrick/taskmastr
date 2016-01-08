<template>
	<div class="error-text">
		<label for="key" v-show="!require && loginAttempt">Password required</label>
		<label for="key" v-show="invalidKey">{{invalidKey}}</label>
	</div>
	<div id="key-line" class="prompt-line">
		<input id="key" class="prompt" type="password" name="password" placeholder="Password" v-model="user.key" v-bind:class="{'invalid': loginAttempt && (!require || invalidKey)}"></input>
		<button id="key-button" class="fa fa-arrow-right submit" type="submit" v-if="!create" v-on:click="setLoginAttempt(true)"></button>
	</div>
</template>

<script>

import store from '../../store/store';

export default {
	computed: {
		user () {
			return store.state.user;
		},
		create () {
			return store.state.create;
		},
		invalidKey () {
			return store.state.invalidKey;
		},
		loginAttempt () {
			return store.state.loginAttempt;
		}
	},
	methods: {
		setLoginAttempt: store.actions.setLoginAttempt
	},
	props: {
		require: Boolean
	}
};

</script>