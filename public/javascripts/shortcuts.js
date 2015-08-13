var shortcut = {
	ctrl: function (key1, key2, el) {
		var map = {};
		map[key1] = false;
		map[key2] = false;

		$(document).keydown(function (e) {
			//console.log('Keydown on ' + e.which);
			if (e.which in map) {
				map[e.which] = true;
				if (map[key1] && map[key2]) {
					$(el).click();
					$(el).focus();
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
	},
	nav: function (key1, key2, el) {
		var map = {};
		map[key1] = false;
		map[key2] = false;

		$(document).keydown(function (e) {
			console.log('Keydown on ' + e.which);
			if (e.which in map) {
				map[e.which] = true;
				if (map[key1] && map[key2]) {
					console.log(el);
					el.next().click();
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
}