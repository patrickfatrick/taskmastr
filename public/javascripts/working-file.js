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
				duration: 0
			});
		});
	}
}

$(keyModal);
$(renameItem);
$(todoHover);
Mousetrap.bind('ctrl+c', function() {
	$('#todo-list .active .complete').click();
})
Mousetrap.bind('ctrl+backspace', function() {
	$('#todo-list .active .delete-button').click();
})
Mousetrap.bind('alt+backspace', function() {
	$('#lists-list .current .delete-button').click();
})
Mousetrap.bind('command+escape', function() {
	$('#logout').click();
})