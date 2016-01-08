import Vue from 'vue';
import App from './App.vue';

// Debug mode. Turned off in production builds
Vue.config.debug = process.env.NODE_ENV !== 'production';

new Vue({
	el: 'body',
	components: {
		app: App
	}
});
