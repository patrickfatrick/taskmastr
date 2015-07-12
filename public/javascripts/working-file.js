var tap = ("ontouchstart" in document.documentElement);

function keyModal() {
	$('#user').focus();
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
		if ($('.rename').val()) {
			el.siblings('.name').show();
			el.hide();
		}
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
		//console.log('Keydown on ' + e.which);
		if (e.which in map) {
			map[e.which] = true;
			if (map[91] && map[40]) {
				$('#save-button.toggled').click();
				map[91] = false;
				map[40] = false;
			}
		}
	});
	$(document).keyup(function (e) {
		//console.log('Keyup on ' + e.which);
		if (e.which in map) {
			map[e.which] = false;
		}
	});
}

function todoHover() {
	if (!tap) {
		$('#content table tbody').on('mouseenter', 'tr:not(".complete"):not(".deleting")', function () {
			$(this).velocity({
				backgroundColor: '#00B0FF',
				backgroundColorAlpha: 1
			}, {
				duration: 0
			});
		});

		$('#content table tbody').on('mouseleave', 'tr', function () {
			$(this).velocity({
				backgroundColorAlpha: 0
			}, {
				duration: 500
			});
		});
	}
}

function menuToggle () {
	$('#icon-menu').click(function () {
		if (!$('#menu').hasClass('toggled')) {
			$('#content').addClass('menued');
			$('#icon-menu').addClass('toggled');
			$('#icon-menu .fa-bars').removeClass('fa-bars').addClass('fa-times');
			$('#menu').addClass('toggled');
		} else {
			$('#content').removeClass('menued');
			$('#icon-menu').removeClass('toggled');
			$('#icon-menu .fa-times').removeClass('fa-times').addClass('fa-bars');
			$('#menu').removeClass('toggled');
		}
	});
};

$(menuToggle);
$(keyModal);
$(renameItem);
$(saveButton);
$(todoHover);