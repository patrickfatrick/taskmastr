import _ from 'lodash';
import hat from 'hat';
import {getSession, login, create, reset, forgot, logout, save} from '../services/user-services';
import defaultList from './default-list';

let timeoutID;

export default {
	/**
	 * User Actions
	 */
	setInit: 'SET_INIT',
	setAuth: 'SET_AUTH',
	toggleCheckbox: 'TOGGLE_CHECKBOX',
	setUsername: 'SET_USERNAME',
	setKey: 'SET_KEY',
	setConfirm: 'SET_CONFIRM',
	setTasks: 'SET_TASKS',
	setForgot: 'SET_FORGOT',
	setCreate: 'SET_CREATE',
	setInvalidKay: 'SET_INVALID_KEY',
	setLoginAttempt: 'SET_LOGIN_ATTEMPT',
	setForgotAttempt: 'SET_FORGOT_ATTEMPT',
	setForgotEmail: 'SET_FORGOT_EMAIL',
	setConfirmAttempt: 'SET_CONFIRM_ATTEMPT',
	setReset: 'SET_RESET_FORM',
	setResetAttempt: 'SET_RESET_ATTEMPT',
	setResetToken: 'SET_RESET_TOKEN',
	setResetFail: 'SET_RESET_FAIL',
	setSaveButton: 'SET_SAVE_BUTTON',
	setDarkmode: (store, bool) => {
		store.dispatch('SET_DARKMODE', bool);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	getSession: store => {
		return getSession()
		.then(response => {
			if (response.error) {
				if (response.error === 204) return store.dispatch('SET_INIT', true);
			}
			/**
			 * Failsafes for IDs, set delete if it doesn't exist.
			 */
			let tasks = (response.tasks) ? response.tasks : response.todos;
			_.each(tasks, list => {
				_.set(list, 'delete', false);
				if (list.hasOwnProperty('agendaID')) {
					_.set(list, 'id', list.agendaID);
					delete list.agendaID;
				}
				if(!list.hasOwnProperty('agendaID') || !list.hasOwnProperty('id')) {
					_.set(list, 'id', hat());
				}
				_.each(list.items, item => {	
					_.set(item, 'delete', false);
					if (list.hasOwnProperty('agendaID')) {
						_.set(item, 'id', item.agendaID);
						delete item.agendaID;
					}
					if(!item.hasOwnProperty('agendaID') && !item.hasOwnProperty('id')) {
						_.set(item, 'id', hat());
					}
					if (!item.hasOwnProperty('dueDate')) {
						_.set(item, 'dueDate', '');
					}
				});
			});
			store.dispatch('SET_USERNAME', response.username);
			store.dispatch('SET_KEY', '');
			store.dispatch('SET_DARKMODE', response.darkmode);
			store.dispatch('SET_TASKS', tasks);
			let current = _.findIndex(store.state.user.tasks, {current: true}) ? _.findIndex(store.state.user.tasks, {current: true}) : 0;
			store.dispatch('SET_CURRENT_LIST', current);
			store.dispatch('SET_AUTH', response.username);
			return response.username;
		});
	},
	loginUser: (store, username, key, rememberMe, isValid) => {
		if (!isValid) return;
		return login(username, key, rememberMe)
		.then(response => {
			if (response.error) {
				if (response.error === 204) return store.dispatch('SET_CREATE');
				if (response.error === 401) return store.dispatch('SET_INVALID_KEY', response.msg);
			}
			let tasks = response.tasks || response.todos;
			_.each(tasks, list => {
				if (list.hasOwnProperty('agendaID')) {
					_.set(list, 'id', list.agendaID);
					delete list.agendaID;
				}
				if(!list.hasOwnProperty('agendaID') || !list.hasOwnProperty('id')) {
					_.set(list, 'id', hat());
				}
				_.each(list.items, item => {	
					_.set(item, 'delete', false);
					if (item.hasOwnProperty('agendaID')) {
						_.set(item, 'id', item.agendaID);
						delete item.agendaID;
					}
					if(!item.hasOwnProperty('agendaID') && !item.hasOwnProperty('id')) {
						_.set(item, 'id', hat());
					}
					if (!item.hasOwnProperty('dueDate')) {
						_.set(item, 'dueDate', '');
					}
				});
			});
			store.dispatch('SET_USERNAME', response.username);
			store.dispatch('SET_KEY', '');
			store.dispatch('SET_DARKMODE', response.darkmode);
			store.dispatch('SET_TASKS', tasks);
			let current = _.findIndex(store.state.user.tasks, {current: true}) ? _.findIndex(store.state.user.tasks, {current: true}) : 0;
			store.dispatch('SET_CURRENT_LIST', current);
			store.dispatch('SET_AUTH', response.username);
			return response.username;
		});
	},
	createUser: (store, username, key, rememberMe, isValid) => {
		if (!isValid) return;
		return create(username, key, rememberMe)
		.then(() => {
			store.dispatch('SET_KEY', '');
			store.dispatch('SET_CONFIRM', '');
			store.dispatch('SET_DARKMODE', true);
			store.dispatch('SET_TASKS', [defaultList]);
			store.dispatch('SET_CURRENT_LIST', 0);
			store.dispatch('SET_AUTH', username);
			return username;
		});
	},
	forgotPassword: (store, username, isValid) => {
		if (!isValid) return;
		forgot(username)
		.then(() => {
			return store.dispatch('SET_FORGOT_EMAIL', true);
		});
	},
	resetPassword: (store, token, key, isValid) => {
		if (!isValid) return;
		return reset(token, key)
		.then(response => {
			if (response.error) {
				if (response.error === 401) return store.dispatch('SET_RESET_FAIL', response.msg);
			}
			return response.username;
		});
	},
	logout: () => {
		return logout()
		.then(() => {
			//document.cookie = 'connect.sid=; expires=-1';
			//store.dispatch('SET_AUTH', false);
			window.location.href = '/';
		});
	},
	save: store => {
		let user = {
			username: store.state.user.username,
			tasks: store.state.user.tasks,
			darkmode: store.state.user.darkmode,
			dateModified: Date.now()
		};
		let deleteAgendas = store.state.deleteAgendas;
		return save (user, deleteAgendas)
		.then((response) => {
			if (response.status !== 200) return;
			return store.dispatch('SET_SAVE_BUTTON', false);
		});
	},
	/**
	 * Task Actions
	 */
	setCurrentTask: 'SET_CURRENT_TASK',
	setNewTask: 'SET_NEW_TASK',
	setTaskDelete: 'SET_TASK_DELETE',
	deleteAgenda: 'DELETE_AGENDA',
	addTask: (store, task) => {
		store.dispatch('ADD_TASK', task);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	removeTask: (store, index) => {
		store.dispatch('REMOVE_TASK', index);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	setTaskComplete: (store, index, bool) => {
		store.dispatch('SET_TASK_COMPLETE', index, bool);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	deleteTask (store, index) {
		const tasks = store.state.user.current.items;
		const task = tasks[index];
		if (!task.delete) {
			timeoutID = setTimeout(() => {
				let prevTask = tasks[index - 1];
				let nextTask = tasks[index + 1];
				if (task.current) {
					if (task.current && index === (tasks.length - 1)) {
						store.dispatch('SET_CURRENT_TASK', _.findIndex(tasks, prevTask));
					} else {
						store.dispatch('SET_CURRENT_TASK', _.findIndex(tasks, nextTask));
					}
				}
				store.dispatch('DELETE_AGENDA', task.id);
				store.dispatch('UPDATE_DELETE_QUEUE', task.id, null);
				store.dispatch('SET_TASK_DELETE', _.findIndex(tasks, {id: task.id}), false);
				store.dispatch('REMOVE_TASK', _.findIndex(tasks, {id: task.id}));
				store.dispatch('SET_SAVE_BUTTON', true);
			}, 5000);
			store.dispatch('UPDATE_DELETE_QUEUE', task.id, timeoutID);
			store.dispatch('SET_TASK_DELETE', _.findIndex(tasks, {id: task.id}), true);
		} else {
			clearTimeout(store.state.deleteQueue[task.id]);
			store.dispatch('UPDATE_DELETE_QUEUE', task.id, null);
			store.dispatch('SET_TASK_DELETE', _.findIndex(tasks, {id: task.id}), false);
			return;
		}
	},
	completeTask (store, index, bool) {
		const tasks = store.state.user.current.items;
		const n = (tasks[index].complete) ? 0 : -1;
		const newIndex = (_.findIndex(tasks, {complete: true}) !== -1) ? _.findIndex(tasks, {complete: true}) + n : tasks.length;
		store.dispatch('SET_TASK_COMPLETE', index, bool);
		store.dispatch('SORT_TASKS', index, newIndex);
		store.dispatch('SET_SAVE_BUTTON', true);
		return;
	},
	setTaskDueDate (store, index, date) {
		store.dispatch('SET_TASK_DUE_DATE', index, date);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	sortTasks (store, oldIndex, newIndex) {
		store.dispatch('SORT_TASKS', oldIndex, newIndex);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	/**
	 * List Actions
	 */
	setCurrentList: 'SET_CURRENT_LIST',
	setMenuToggled: 'SET_MENU_TOGGLED',
	setNewList: 'SET_NEW_LIST',
	addList: (store, list) => {
		store.dispatch('ADD_LIST', list);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	removeList: (store, index) => {
		store.dispatch('REMOVE_LIST', index);
		store.dispatch('SET_SAVE_BUTTON', true);
	},
	deleteList (store, index) {
		const lists = store.state.user.tasks;
		if (lists.length === 1) return;
		const list = lists[index];
		if (!list.delete) {
			timeoutID = setTimeout(() => {
				let prevList = lists[index - 1];
				let nextList = lists[index + 1];
				//Do not allow if it's the only list
				if (lists.length === 1) {
					store.dispatch('UPDATE_DELETE_QUEUE', list.id, null);
					store.dispatch('SET_LIST_DELETE', _.findIndex(lists, {id: list.id}), false);
					return;
				}
				if (list.current) {
					if (list.current && index === (lists.length - 1)) {
						store.dispatch('SET_CURRENT_LIST', _.findIndex(lists, prevList));
					} else {
						store.dispatch('SET_CURRENT_LIST', _.findIndex(lists, nextList));
					}
				}
				_.each(list.items, item => {
					store.dispatch('DELETE_AGENDA', item.id);
				});
				store.dispatch('UPDATE_DELETE_QUEUE', list.id, null);
				store.dispatch('SET_LIST_DELETE', _.findIndex(lists, {id: list.id}), false);
				store.dispatch('REMOVE_LIST', _.findIndex(lists, {id: list.id}));
				store.dispatch('SET_SAVE_BUTTON', true);
			}, 5000);
			store.dispatch('UPDATE_DELETE_QUEUE', list.id, timeoutID);
			store.dispatch('SET_LIST_DELETE', _.findIndex(lists, {id: list.id}), true);
		} else {
			clearTimeout(store.state.deleteQueue[list.id]);
			store.dispatch('UPDATE_DELETE_QUEUE', list.id, null);
			store.dispatch('SET_LIST_DELETE', _.findIndex(lists, {id: list.id}), false);
			return;
		}
	},
	sortLists (store, oldIndex, newIndex) {
		store.dispatch('SORT_LISTS', oldIndex, newIndex);
		store.dispatch('SET_SAVE_BUTTON', true);
	}
};