import _ from 'lodash';
import {TOGGLE_CHECKBOX, SET_USERNAME, SET_KEY, SET_CONFIRM, SET_DARKMODE, SET_TASKS, SET_FORGOT, SET_CREATE, SET_INVALID_KEY, SET_LOGIN_ATTEMPT, SET_FORGOT_ATTEMPT, SET_FORGOT_EMAIL, SET_CONFIRM_ATTEMPT, SET_CURRENT_TASK, SET_CURRENT_LIST, SET_MENU_TOGGLED, SET_SAVE_BUTTON, ADD_TASK, REMOVE_TASK, SET_NEW_TASK, ADD_LIST, REMOVE_LIST, SET_NEW_LIST, SET_TASK_COMPLETE, SET_TASK_DELETE, SET_TASK_DUE_DATE, DELETE_AGENDA, UPDATE_DELETE_QUEUE, SET_LIST_DELETE, SORT_TASKS, SORT_LISTS} from './mutation-types';

export default {
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
	[SET_CURRENT_TASK] (state, index) {
		_.set(_.find(state.user.current.items, 'current', true), 'current', false);
		return state.user.current.items[index].current = true;
	},
	[SET_CURRENT_LIST] (state, index) {
		_.set(_.find(state.user.tasks, 'current', true), 'current', false);
		state.user.tasks[index].current = true;
		return state.user.current = state.user.tasks[index];
	},
	[SET_MENU_TOGGLED] (state, bool) {
		return state.menuToggled = bool;
	},
	[SET_SAVE_BUTTON] (state, bool) {
		return state.saveButton = bool;
	},
	[ADD_TASK] (state, task) {
		return state.user.current.items.unshift(task);
	},
	[REMOVE_TASK] (state, index) {
		return state.user.current.items.splice(index, 1);
	},
	[SET_NEW_TASK] (state, task) {
		return state.newTask = task;
	},
	[ADD_LIST] (state, list) {
		return state.user.tasks.unshift(list);
	},
	[REMOVE_LIST] (state, index) {
		return state.user.tasks.splice(index, 1);
	},
	[SET_NEW_LIST] (state, list) {
		return state.newList = list;
	},
	[SET_TASK_COMPLETE] (state, index, bool) {
		return state.user.current.items[index].complete = bool;
	},
	[SET_TASK_DELETE] (state, index, bool) {
		return state.user.current.items[index].delete = bool;
	},
	[SET_TASK_DUE_DATE] (state, index, date) {
		return state.user.current.items[index].dueDate = date;
	},
	[DELETE_AGENDA] (state, id) {
		return state.deleteAgendas.push(id);
	},
	[UPDATE_DELETE_QUEUE] (state, id, val) {
		return state.deleteQueue[id] = val;
	},
	[SET_LIST_DELETE] (state, index, bool) {
		return state.user.tasks[index].delete = bool;
	},
	[SORT_TASKS] (state, oldIndex, newIndex) {
		let spliced = state.user.current.items.splice(oldIndex, 1);
		state.user.current.items.splice(newIndex, 0, spliced[0]);
	},
	[SORT_LISTS] (state, oldIndex, newIndex) {
		let spliced = state.user.tasks.splice(oldIndex, 1);
		state.user.tasks.splice(newIndex, 0, spliced[0]);
	}
};