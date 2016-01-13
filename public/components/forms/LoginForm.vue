<template>
	<form id="user-form" name="userForm" action="/users/login" novalidate v-if="!forgot && !create && !reset" v-on:submit.prevent="loginUser(user.username, user.key, rememberMe, isValid)">
		<username-input :validate="validate.usernameEmail" :require="validate.usernameRequired"></username-input>
		<key-input :require="validate.passwordRequired"></key-input>
		<remember-me></remember-me>
		<forgot-password></forgot-password>
	</form>
</template>

<script>

import store from '../../store/store';
import UsernameInput from './form-components/UsernameInput.vue';
import KeyInput from './form-components/KeyInput.vue';
import RememberMe from './form-components/RememberMe.vue';
import ForgotPassword from './form-components/ForgotPassword.vue';

const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
	components: {
		UsernameInput,
		KeyInput,
		RememberMe,
		ForgotPassword
	},
	computed: {
		auth () {
			return store.state.auth;
		},
		user () {
			return store.state.user;
		},
		reset () {
			return store.state.reset;
		},
		forgot () {
			return store.state.forgot;
		},
		create () {
			return store.state.create;
		},
		rememberMe () {
			return store.state.rememberMe;
		},
		validate () {
			return {
				usernameEmail: emailRE.test(this.user.username),
				usernameRequired: !!this.user.username.trim(),
				passwordRequired: !!this.user.key.trim()
			};
		},
		isValid () {
			var validation = this.validate;
			return Object.keys(validation).every(function (key) {
				return validation[key];
			});
		}
	},
	methods: {
		loginUser (username, key, rememberMe, isValid) {
			store.actions.loginUser(username, key, rememberMe, isValid)
			.then (() => {
				if (this.auth) {
					setTimeout(() => {
						this.$route.router.go('/app');
					}, 750);
				}
			});
		}
	}
};

</script>