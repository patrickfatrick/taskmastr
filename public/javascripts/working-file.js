var tap = ("ontouchstart" in document.documentElement);

// Handler to prevent auto-focuses on text inputs for mobile
function windowWidth() {
	return ($(window).width() > 768) ? true : false;
}

function keyModal() {
	if (windowWidth()) {
		$('#user').focus();
	}
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

function shortcut(key1, key2, el) {
	var map = {};
	map[key1] = false;
	map[key2] = false;

	$(document).keydown(function (e) {
		//console.log('Keydown on ' + e.which);
		if (e.which in map) {
			map[e.which] = true;
			if (map[key1] && map[key2]) {
				$(el).click();
				map[key1] = false;
				map[key2] = false;
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
			$(this).stop().velocity({
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

$(keyModal);
$(renameItem);
$(shortcut(91, 40, '#save-button.toggled'));
$(shortcut(91, 39, '#icon-menu:not(".toggled")'));
$(shortcut(91, 37, '#icon-menu.toggled'));
$(shortcut(91, 38, '#dark-mode'));
$(todoHover);