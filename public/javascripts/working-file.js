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
		$('#create-todo').focus();
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
		$('table tbody td.toggle').toggle('fade', 100);
		setTimeout(function () {
			$('table tbody td.utils').toggle('fade', 100);
		}, 250);
	})

	$('body').on('click', '#save-button', function () {
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
$(createTodo);
$(completeItem);
$(renameItem);
$(darkMode);
$(saveButton);
$(mobileButtons);
$(todoHover);
