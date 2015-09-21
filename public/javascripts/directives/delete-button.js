import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';
import _ from 'lodash';

export default function deleteButton () {
	let timeoutID;
	let pending = {};
	
	return {
		restrict: 'A',
		scope: {
			deleteButton: '=',
			deleteIndex: '='
		},
		link: (scope, element, attrs) => {
			element.on('click', e => {
				const item = element.parents('tr');
				const arr = scope.deleteButton;
				if (!item.hasClass('deleting')) {
					element.removeClass('fa-trash-o').addClass('fa-undo');
					item.addClass('deleting');
					let arrLength = arr.length;
					let index = _.findIndex(arr, 'agendaID', scope.deleteIndex);;
					// 1) Deleting a list
					// 2) Deleting a task
					if (arr === scope.$parent.user.todos) {
						timeoutID = setTimeout(() => {
							scope.$apply(() => {
								let spliced = _.remove(arr, 'agendaID', scope.deleteIndex);
								//console.log(spliced[0]);

								// Current list handlers: 
								// 1) Check if user is deleting the only list: do not allow
								// 2) Check if deleted list is the last list: set current to first list
								// 3) By default if current list is deleted: set current to next list
								if (spliced[0].current && arrLength === 1) {
									arr.splice(0, 1, spliced[0]);
									spliced = undefined;
									element.removeClass('fa-undo').addClass('fa-trash-o');
									item.removeClass('deleting');
								} else if (spliced[0].current && index === (arrLength - 1)) {
									scope.$parent.setCurrent(arr, 0);
								} else if (spliced[0].current) {
									scope.$parent.setCurrent(arr, index);
								}
								//If deleted, delete the list's agendas
								if (spliced) {
									_.each(spliced[0].items, (val, i) => {
										scope.$parent.setDeleteAgendas(val.agendaID);
									});
								}
							});
						}, 5000);
						pending[timeoutID] = 1;
						_.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID = timeoutID;
					} else {
						timeoutID = setTimeout(() => {
							scope.$apply(() => {
								let spliced = _.remove(arr, 'agendaID', scope.deleteIndex);
								if (spliced[0].current && index === (arrLength - 1)) {
									scope.$parent.setCurrent(arr, 0);
								} else if (spliced[0].current) {
									scope.$parent.setCurrent(arr, index);
								}
								//console.log(spliced);

								//If deleted, delete associated agendas
								scope.$parent.setDeleteAgendas(spliced[0].agendaID);
							});
						}, 5000);
						pending[timeoutID] = 1;
						_.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID = timeoutID;
					}
				} else {
					element.removeClass('fa-undo').addClass('fa-trash-o');
					item.removeClass('deleting');
					let deleteID;
					scope.$apply(() => {
						deleteID = _.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID;
						if (pending.hasOwnProperty(deleteID)) {
							clearTimeout(deleteID);
							delete pending[deleteID];
							delete _.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID;
							//console.log('Timeout cleared: ' + deleteID);
						}
					});
				}
			});
		}
	}
}