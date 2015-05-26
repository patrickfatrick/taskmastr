var userKey;
var userObj;

function windowWidth() {
	return $(window).width();
}

function windowHeight() {
	return $(window).height();
}

function loadData(key) {
	$.ajax({
		url: 'users/login',
		method: 'POST',
		data: {
			key: key
		},
		dataType: 'json',
		success: function (user) {
			userObj = user;
			user.todos.forEach(function (val, i) {
				var todo = val.item;
				var complete = val.status;
				var icon = complete ? 'fa fa-check-circle-o' : 'fa fa-circle-o';
				var checked = complete ? 'checked' : '';
				$('table tbody').append(
					'<tr class="todo ' + complete + '" value="' + todo + '"><th><input type="checkbox" class="check" ' + checked + '></input><i class="' + icon + '"></i></th><td class="todo-cell"><input type="text" class="rename" style="display: none;" value="' + todo + '"></input><span class="name">' + todo + '</span></td><td class="toggle"><i class="fa fa-bullseye"></i></td><td class="utils"><i class="fa fa-bars"></i><i class="fa fa-pencil"></i><i class="fa fa-trash-o"></i></td></tr>'
				);
			});
			$('#dark-mode').attr('value', user.darkmode);
			if (user.darkmode === 'on') {
				$('#dark-mode').addClass('dark');
				$('body').addClass('dark-mode')
			}
		},
		error: function (result) {
			console.log(result);
		}
	});
}

function saveData(obj) {
	$.post("/users/write", {
		json: JSON.stringify(obj),
	}, function (result) {
		console.log(result);
	});
}

function keyModal() {
	var width = windowWidth();
	var height = windowHeight();
	var modal = $('#key-modal');
	var mask = $('#mask');
	var modalWidth = modal.width();
	var modalHeight = modal.height();

	function removeModal() {
		mask.fadeOut(500);
		modal.removeClass('active-modal').animate({
			top: '-1000px'
		}, 500);
	}

	modal.addClass('active-modal').css({
		left: width / 2 - (modalWidth / 2) - 10 + 'px'
	});
	modal.animate({
		top: '10%'
	}, 500);
	if (windowWidth() < 768) {
		modal.css({
			width: width + 'px'
		});
	}

	(function () {
		$('#tips-button').click(function () {
			$('.fine-print').slideToggle(250);
		})
	})();

	$('#key').focus();
	mask.click(function () {
		removeModal();
		$('#create-todo').focus();
	});

	$('#key-button').click(function () {
		userKey = $('#key').val();
		removeModal();
		//if (userKey) loadData(userKey);
		$('#create-todo').focus();
	});

	$('#key').keydown(function () {
		var key = event.which;
		if (key === 13) {
			$('#key-button').click();
		}
	});
}

function sortable() {
	var list = $('table tbody');

	list.sortable({
		axis: "y",
		items: "> tr:not(.complete)",
		handle: '.fa-bars',
		opacity: 0.8,
		helper: function (e, ui) {
			ui.children().each(function () {
				$(this).width($(this).width());
			});
			return ui;
		}
	});
}

function createTodo() {
	/*$('#todo-button').click(function () {
		var todo = $('#create-todo').val();
		if (todo) {
			$('table tbody').prepend(
				'<tr class="todo" value="' + todo + '"><th><input type="checkbox" class="check"></input><i class="fa fa-circle-o"></i></th><td class="todo-cell"><input type="text" class="rename" style="display: none;" value="' + todo + '"></input><span class="name">' + todo + '</span></td><td class="toggle"><i class="fa fa-bullseye"></i></td><td class="utils"><i class="fa fa-bars"></i><i class="fa fa-pencil"></i><i class="fa fa-trash-o"></i></td></tr>'
			);
			$('#create-todo').val('');
		}
	});*/

	$('#create-todo').keydown(function () {
		var key = event.which;
		if (key === 13) {
			$('#create-todo').val('');
			$('#todo-button').click();
		}
		$('#todo-button').click(function() {
			$('#create-todo').val('');
		})
	});
}

function completeItem() {
	$('table').on('click', '.fa-circle-o', function () {
		$(this).siblings('.check').click();
		//$(this).removeClass('fa-circle-o').addClass('fa-check-circle-o');
	});
	$('table').on('click', '.fa-check-circle-o', function () {
		$(this).siblings('.check').click();
		//$(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
	});
	/*$('table').on('click', '.check', function () {
		var checked = $(this).prop('checked');
		var item = $(this).parents('.todo');
		var list = $(this).parents('tbody');
		var firstComplete = item.siblings('.complete').first();
		if (checked) {
			item.addClass('complete');
			firstComplete.length > 0 ? firstComplete.before(item) : list.append(item);
			list.sortable('destroy');
			sortable();
		} else {
			item.removeClass('complete');
			firstComplete.length > 0 ? firstComplete.before(item) : list.append(item);
			list.sortable('destroy');
			sortable();
		}
	});*/
}

function deleteItem() {
	$('table tbody').on('click', '.fa-trash-o', function () {
		$(this).parents('.todo').toggle('fade', 250, function () {
			$(this).remove();
		});
	})
}

function renameItem() {
	$('table tbody').on('dblclick', '.name', function () {
		$(this).hide();
		$(this).siblings('.rename').show().select();
	});

	$('table tbody').on('click', '.fa-pencil', function () {
		var text = $(this).parents('tr').find('span.name');
		var rename = $(this).parents('tr').find('.rename');
		text.hide();
		rename.show().select();
	});

	$('table tbody').on('keydown', '.rename', function () {
		var key = event.which;
		if (key === 13) {
			$(this).siblings('.name').show()
			$(this).hide()
			/*var newName = $(this).val();
			$(this).siblings('.name').show().text(newName);
			$(this).hide().attr('value', newName);
			$(this).parents('.todo').attr('value', newName);*/

		}
	});
}

function createObj() {
	var liArr = $('table tbody tr');
	var todoArr = [];
	var now = new Date();
	liArr.each(function (i, val) {
		var todoText = $(this).attr('value');
		var todoObj = {};
		todoObj.item = todoText;
		todoObj.status = $(this).hasClass('complete') ? 'complete' : '';
		todoArr.push(todoObj);
	})
	userObj.todos = todoArr;
	userObj.darkmode = $('#dark-mode').attr('value');
	userObj.dateModified = now.toISOString();
	return userObj;
}

function darkMode() {
	$('#dark-mode').click(function () {
		/*$(this).toggleClass('dark');
		$('body').toggleClass('dark-mode');
		var value = $(this).hasClass('dark') ? 'on' : 'off'
		$(this).attr('value', value);*/
		$(this).siblings('.check').click();
	});
}

function saveButton() {

	var count = 0;

	function observeChange(id, config) {
		var target = document.getElementById(id);
		var observer = new MutationObserver(function (mutations) {
			if (userKey) {
				if (count > 0) {
					$('#save-button').addClass('toggled');
				}
				count++;
			}
		});

		var observerConfig = config;
		observer.observe(target, observerConfig);
	}

	/*observeChange('todo-list', {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ['value']
	});
	observeChange('dark-mode', {
		attributes: true
	});*/

	var map = {
		91: false,
		40: false
	};

	$(document).keydown(function (e) {
		if (e.which in map) {
			map[e.which] = true;
			if (map[91] && map[40]) {
				$('#save-button.toggled').click();
			}
		}
	}).keyup(function (e) {
		if (e.which in map) {
			map[e.which] = false;
		}
	});

	$('#save-button').click(function () {
		$(this).removeClass('toggled');
		//saveData(createObj());
	})
}

function mobileButtons() {
	var width = windowWidth();
	$('table tbody').on('click', '.fa-bullseye', function () {
		$('table tbody td.toggle').toggle('fade', 100);
		setTimeout(function () {
			$('table tbody td.utils').toggle('fade', 100);
		}, 250);
	})

	$('table tbody').on('click', '.fa-bars', function () {
		if (width < 768) {
			$('table tbody td.utils').toggle('fade', 100);
			setTimeout(function () {
				$('table tbody td.toggle').toggle('fade', 100);
			}, 250);
		}
	})
}

function todoHover() {
	$('table tbody').on('mouseenter', 'tr', function () {
		$(this).addClass('hoverover');
	})
	$('table tbody').on('mouseleave', 'tr', function () {
		$(this).removeClass('hoverover', 750);
	})
}

$(keyModal);
//$(sortable);
$(createTodo);
$(completeItem);
$(deleteItem);
$(renameItem);
$(darkMode);
$(saveButton);
$(mobileButtons);
$(todoHover);