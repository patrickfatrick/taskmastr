var userKey;

function windowWidth() {
	return $(window).width();
}

function windowHeight() {
	return $(window).height();
}

function keyModal() {
	var width = windowWidth();
	var height = windowHeight();
	var modal = $('#key-modal');
	var mask = $('#mask');
	var modalWidth = modal.width();
	var modalHeight = modal.height();

	function removeModal() {
		mask.velocity('fadeOut', {duration: 500});
		modal.removeClass('active-modal').velocity({
			top: '-1000px'
		}, 500);
	}

	modal.addClass('active-modal').css({
		left: width / 2 - (modalWidth / 2) - 10 + 'px'
	});
	modal.velocity({
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

	$('#key-button').click(function () {
		userKey = $('#key').val();
		if (userKey) {
			removeModal();
			$('#create-todo').focus();
		}
	});

	$('#key').keydown(function () {
		var key = event.which;
		if (key === 13) {
			$('#key-button').click();
		}
	});
}

function createTodo() {
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
		$(this).siblings('complete').children('.check').click();
	});
	$('table').on('click', '.fa-check-circle-o', function () {
		$(this).siblings('complete').children('.check').click();
	});
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
		}
	});
}

function darkMode() {
	$('#dark-mode').click(function () {
		$(this).siblings('.check').click();
	});
}

function saveButton() {

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
	})
}

function mobileButtons() {
	var width = windowWidth();
	$('table tbody').on('click', '.fa-bullseye', function () {
		$('table tbody td.toggle').velocity('fadeOut', {duration: 100});
		$('table tbody td.utils').velocity('fadeIn', {delay: 100, duration: 100});
	})

	$('body').on('click', '#save-button', function () {
		if (width < 768) {
			$('table tbody td.utils').velocity('fadeOut', {duration: 100});
			$('table tbody td.toggle').velocity('fadeIn', {delay: 100, duration: 100});
		}
	})
}

function todoHover() {
	$('table tbody').on('mouseenter', 'tr:not(".complete")', function () {
		$(this).velocity({backgroundColor: '#00B0FF', backgroundColorAlpha: 1}, {duration: 0});
	})
	$('table tbody').on('mouseleave', 'tr', function () {
		$(this).velocity({backgroundColorAlpha: 0}, {duration: 500});
	})
}

$(keyModal);
$(createTodo);
$(completeItem);
$(renameItem);
$(darkMode);
$(saveButton);
$(mobileButtons);
$(todoHover);
