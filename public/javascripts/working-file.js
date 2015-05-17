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
				$('#todo-list').append(
					'<li class="todo ' + complete + '" value="' + todo + '"><input type="checkbox" class="check" ' + checked + '></input><i class="' + icon + '"></i><input type="text" class="rename" style="display: none;" value="' + todo + '"></input><span class="name">' + todo + '</span><i class="fa fa-trash-o"></i></li>'
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

	$('#key').keydown(function () {
		var key = event.which;
		if (key === 13) {
			userKey = $(this).val();
			removeModal();
			if (userKey) loadData(userKey);
			$('#create-todo').focus();
		}
	})
}

function sortable() {
	var list = $('#todo-list');
	list.sortable({
		axis: "y",
		items: "> li:not(.complete)"
	});
}

function createTodo() {
	$('#create-todo').keydown(function () {
		var key = event.which;
		if (key === 13) {
			var todo = $(this).val();
			$('#todo-list').prepend(
				'<li class="todo" value="' + todo + '"><input type="checkbox" class="check"></input><i class="fa fa-circle-o"></i><input type="text" class="rename" style="display: none;" value="' + todo + '"></input><span class="name">' + todo + '</span><i class="fa fa-trash-o"></i></li>'
			);
			$(this).val('');
		}
	})
}

function completeItem() {
	$('#todo-list').on('click', '.fa-circle-o', function () {
		$(this).siblings('.check').click();
		$(this).removeClass('fa-circle-o').addClass('fa-check-circle-o');
	});
	$('#todo-list').on('click', '.fa-check-circle-o', function () {
		$(this).siblings('.check').click();
		$(this).removeClass('fa-check-circle-o').addClass('fa-circle-o');
	});
	$('#todo-list').on('click', '.check', function () {
		var checked = $(this).prop('checked');
		var item = $(this).parent();
		var list = $(this).parents('#todo-list');
		var firstComplete = $(this).parent().siblings('.complete').first();
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
	});
}

function deleteItem() {
	$('#todo-list').on('click', '.fa-trash-o', function () {
		$(this).parents('li').toggle('slide', 500, function () {
			$(this).remove();
		});
	})
}

function renameItem() {
	$('#todo-list').on('dblclick', '.name', function () {
		var name = $(this).text();
		$(this).hide();
		$(this).siblings('.rename').show().select();
	});

	$('#todo-list').on('keydown', '.rename', function () {
		var key = event.which;
		if (key === 13) {
			var newName = $(this).val();
			$(this).siblings('.name').show().text(newName);
			$(this).hide().attr('value', newName);
			$(this).parents('.todo').attr('value', newName);

		}
	});
}

function writeData() {
	function createObj() {
		var liArr = $('#todo-list li');
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

	//desktop write to db
	window.addEventListener('beforeunload', function (e) {
		var obj = (userKey.length > 0) ? createObj() : null;
		if (userKey) {
			$.post("/users/write", {
				json: JSON.stringify(obj),
			}, function (result) {
				console.log(result);
			});
		}
	});

	//mobile Safari write to db (doesn't support unload)
	window.addEventListener('pagehide', function (e) {
		var obj = (userKey.length > 0) ? createObj() : null;
		if (userKey) {
			$.post("/users/write", {
				json: JSON.stringify(obj),
			}, function (result) {
				console.log(result);
			});
		}
	});
}

function darkMode() {
	$('#dark-mode').click(function () {
		$(this).toggleClass('dark');
		$('body').toggleClass('dark-mode');
		var value = $(this).hasClass('dark') ? 'on' : 'off'
		$(this).attr('value', value);
	});
}

$(keyModal);
$(sortable);
$(createTodo);
$(completeItem);
$(deleteItem);
$(renameItem);
$(writeData);
$(darkMode);