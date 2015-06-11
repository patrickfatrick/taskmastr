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

	$('#tips-button').click(function () {
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

	var renameHandler = function (el) {
		el.siblings('.name').show();
		el.hide();
	}

	$('table tbody').on({
			keydown: function (e) {
				var key = e.which;
				if (key === 13) {
					renameHandler($(this));
				}
			},
			blur: function () {
				renameHandler($(this));
			}
		},
		'.rename'
	);
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
		$('table tbody').on('mouseenter', 'tr:not(".complete"):not(".deleting")', function () {
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
