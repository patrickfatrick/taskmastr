var userKey;
var tap = ("ontouchstart" in document.documentElement);

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
		mask.velocity('fadeOut', {
			duration: 500
		});
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


	$('#tips-button').not('.toggled').click(function () {
		if ($('#tips-button').hasClass('toggled')) {
			$('.fine-print').velocity('slideUp', {
				duration: 250,
				complete: function () {
					$('#tips-button').removeClass('toggled');
				}
			});
		} else {
			$('.fine-print').velocity('slideDown', {
				duration: 250,
				complete: function () {
					$('#tips-button').addClass('toggled');
				}
			});
		}
	});

	$('#key').focus();

	$('#key-button').click(function () {
		userKey = $('#key').val();
		if (userKey) {
			removeModal();
			$('#create-todo').focus();
		}
	});

	$('#key').keydown(function (e) {
		var key = e.which;
		if (key === 13) {
			$('#key-button').click();
		}
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

	$('table tbody').on('keydown', '.rename', function (e) {
		var key = e.which;
		if (key === 13) {
			$(this).siblings('.name').show()
			$(this).hide()
		}
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
}

function todoHover() {
	if (!tap) {
		$('table tbody').on('mouseenter', 'tr:not(".complete")', function () {
			$(this).velocity({
				backgroundColor: '#00B0FF',
				backgroundColorAlpha: 1
			}, {
				duration: 0
			});
		});

		$('table tbody').on('mouseleave', 'tr', function () {
			$(this).velocity({
				backgroundColorAlpha: 0
			}, {
				duration: 500
			});
		});
	}
}

$(keyModal);
$(renameItem);
$(saveButton);
$(todoHover);