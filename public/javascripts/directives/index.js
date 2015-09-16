import angular from 'angular';
import complete from './complete';
import save from './save';
import checkButton from './check-button';
import createTodo from './create-todo';
import todoButton from './todo-button';
import inputKey from './input-key';
import loginForm from './login-form';
import resetForm from './reset-form';
import deleteButton from './delete-button';
import tipsButton from './tips-button';
import menuToggle from './menu-toggle';
import datepickerToggle from './datepicker-toggle';
import rename from './rename';
import renameProxy from './rename-proxy';
import hover from './hover';

export default function () {
	var app = angular.module('taskmastrDirectives', []);
	
	app.directive('complete', complete);
	app.directive('save', save);
	app.directive('checkButton', checkButton);
	
	// 'createTodo' is actually also used for the Lists text input
	app.directive('createTodo', createTodo);
	app.directive('todoButton', todoButton);
	app.directive('inputKey', inputKey);
	app.directive('loginForm', loginForm);
	app.directive('resetForm', resetForm);
	app.directive('deleteButton', deleteButton);
	app.directive('tipsButton', tipsButton);
	app.directive('menuToggle', menuToggle);
	app.directive('datepickerToggle', datepickerToggle);
	app.directive('rename', rename);
	app.directive('renameProxy', renameProxy);
	app.directive('hover', hover);
}