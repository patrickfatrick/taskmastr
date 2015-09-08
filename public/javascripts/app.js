'use strict';
/* App Module */

/*import $  from 'jquery';
import 'jquery-ui';
import _ from 'lodash';
import velocity from 'velocity';
import moment from 'moment';
import date from '../libraries/date.js/dist/date.min';
import dateStrs from './dates';*/
import angular from '../bower/angular';
import '../bower/angular-touch/';
import '../bower/angular-animate/';
import '../bower/angular-ui-date/src/date';
import '../bower/Sortable/Sortable';
import '../bower/Sortable/ng-sortable';
import hotkeys from '../bower/angular-hotkeys/build/hotkeys';

/*Promise.all(
	['../bower/jquery/dist/jquery.min',
	 '../libraries/jquery-ui/jquery-ui',
	 '../bower/lodash/lodash.min.js',
	 '../bower/velocity/velocity.min',
	 '../bower/moment/min/moment.min',
	 '../libraries/date.js/dist/date.min',
	 './dates',
	 '../bower/angular/angular.min',
	 '../bower/angular-touch/angular-touch.min',
	 '../bower/angular-animate/angular-animate',
	 '../bower/angular-ui-date/src/date',
	 '../bower/Sortable/Sortable',
	 '../bower/Sortable/ng-sortable',
	 '../bower/angular-hotkeys/build/hotkeys.min',
	 './controllers',
	 './directives',
	 './interactions'
	]
		.map(x => System.import(x)))
	.then(function () {
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

		interactions.keyModal();
		interactions.renameItem();
		interactions.todoHover();

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
	});*/

import controllers from './controllers';
import directives from './directives';

import interactions from './interactions';

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

interactions.keyModal();
interactions.renameItem();
interactions.todoHover();

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