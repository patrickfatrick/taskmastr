'use strict';
/* App Module */

import $ from 'jquery';
import jQuery from 'jquery';
import angular from 'angular';
import ngTouch from 'angular-touch';
import ngAnimate from 'angular-animate';
import uiDate from 'angular-ui-date';
import Sortable from 'Sortable';
import ngSortable from 'ng-sortable';
import hotkeys from 'angular-hotkeys';
import gregorian from 'gregorian';

import controllers from './controllers/index';
import directives from './directives/index';

var app = angular.module('taskmastrApp', [
	'ngTouch',
	'ngAnimate',
	'cfp.hotkeys',
	'ui.date',
	'ng-sortable',
	'taskmastrControllers',
	'taskmastrDirectives'
]);

controllers();
directives();

/**
* Shortcuts declared here due to $apply foibles in UserController
*/
Mousetrap.bind('ctrl+c', function () {
	$('#todo-list .active .complete').click();
})
Mousetrap.bind('ctrl+backspace', function () {
	$('#todo-list .active .delete-button').click();
})
Mousetrap.bind('alt+backspace', function () {
	$('#lists-list .current .delete-button').click();
})
Mousetrap.bind('command+escape', function () {
	$('#logout').click();
})