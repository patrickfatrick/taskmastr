import {SET_INIT, TOGGLE_CHECKBOX, SET_USERNAME, SET_KEY, SET_CONFIRM, SET_DARKMODE, SET_TASKS, SET_FORGOT, SET_CREATE, SET_INVALID_KEY, SET_LOGIN_ATTEMPT, SET_FORGOT_ATTEMPT, SET_FORGOT_EMAIL, SET_CONFIRM_ATTEMPT, SET_RESET, SET_RESET_ATTEMPT, SET_RESET_TOKEN, SET_RESET_FAIL, SET_SAVE_BUTTON} from '../mutation-types';

export const userMutations = {
	[SET_INIT] (state, bool) {
		return state.init = bool;
	},
	[TOGGLE_CHECKBOX] (state, checkbox) {
		return state[checkbox] = !state[checkbox];
	},
	[SET_USERNAME] (state, username) {
		return state.user.username = username;
	},
	[SET_KEY] (state, key) {
		return state.user.key = key;
	},
	[SET_CONFIRM] (state, confirm) {
		return state.user.confirm = confirm;
	},
	[SET_DARKMODE] (state, bool) {
		return state.user.darkmode = bool;
	},
	[SET_TASKS] (state, tasks) {
		return state.user.tasks = tasks;
	},
	[SET_FORGOT] (state) {
		return state.forgot = !state.forgot;
	},
	[SET_CREATE] (state) {
		return state.create = !state.create;
	},
	[SET_INVALID_KEY] (state, msg) {
		return state.invalidKey = msg;
	},
	[SET_LOGIN_ATTEMPT] (state, bool) {
		return state.loginAttempt = bool;
	},
	[SET_FORGOT_ATTEMPT] (state, bool) {
		return state.forgotAttempt = bool;
	},
	[SET_FORGOT_EMAIL] (state, bool) {
		return state.forgotEmail = bool;
	},
	[SET_CONFIRM_ATTEMPT] (state, bool) {
		return state.confirmAttempt = bool;
	},
	[SET_RESET] (state, bool) {
		return state.reset = bool;
	},
	[SET_RESET_ATTEMPT] (state, bool) {
		return state.resetAttempt = bool;
	},
	[SET_RESET_TOKEN] (state, val) {
		return state.resetToken = val;
	},
	[SET_RESET_FAIL] (state, val) {
		return state.resetFail= val;
	},
	[SET_SAVE_BUTTON] (state, bool) {
		return state.saveButton = bool;
	}
};