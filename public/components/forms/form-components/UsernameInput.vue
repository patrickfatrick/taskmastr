<template>
	<div class="error-text">
		<span v-show="!require && (loginAttempt || forgotAttempt)">Email address required</span>
		<span v-show="!validate && require && loginAttempt">Invalid email address</span>
		<span v-show="forgot && forgotAttempt">That username doesn't exist</span>
		<span v-show="forgot && forgotEmail">Check your email for instructions on how to reset your password.</span>
	</div>
	<div id="user-line" class="prompt-line">
		<input id="user" class="prompt" type="text" name="username" placeholder="Email" v-model="user.username" v-bind:class="{'invalid': loginAttempt && (!require || !validate)}"></input>
		<button id="forgot-button" class="fa fa-arrow-right submit" type="submit" v-if="forgot" v-on:click="setForgotAttempt(true)">
	</div>
</template>

<script>

import store from '../../../store/store';

export default {
	computed: {
		user () {
			return store.state.user;
		},
		forgot () {
			return store.state.forgot;
		},
		forgotEmail () {
			return store.state.forgotEmail;
		},
		loginAttempt () {
			return store.state.loginAttempt;
		}
	},
	props: {
		validate: Boolean,
		require: Boolean
	},
	methods: {
		setForgotAttempt: store.actions.setForgotAttempt
	}
};

</script>