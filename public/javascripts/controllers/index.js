import angular from 'angular';
import UserController from './user/user';

export default function () {
	'use strict';
	/* Controllers */

	var app = angular.module('taskmastrControllers', []);

	app.config(['$locationProvider', 'hotkeysProvider', ($locationProvider, hotkeysProvider) => {
		$locationProvider.html5Mode(true);
		hotkeysProvider.includeCheatSheet = false;
	}]);
	
	app.controller('UserController', UserController());
}