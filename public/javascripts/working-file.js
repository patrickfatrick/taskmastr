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

$(keyModal);
$(renameItem);
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