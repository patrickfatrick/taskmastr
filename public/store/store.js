import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			username: '',
			key: '',
			confirm: '',
			darkmode: false,
			tasks: [],
			current: {}
		},
		forgot: false,
		create: false,
		reset: false,
		rememberMe: false,
		invalidKey: false,
		loginAttempt: false,
		forgotAttempt: false,
		forgotEmail: false,
		confirmAttempt: false,
		menuToggled: false,
		saveButton: false,
		deleteAgendas: [],
		deleteQueue: {}
	},
	mutations: mutations,
	actions: actions
});