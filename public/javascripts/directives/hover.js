import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';
import velocity from 'velocity';

export default function hover() {
	return {
		restrict: "A",
		scope: {
			complete: '=',
			completeIndex: '='
		},
		link: function (scope, element, attrs) {
			var tap = ("ontouchstart" in document.documentElement);
			if (!(tap)) {
				element.on('mouseenter', function () {
					element.stop().velocity({
						backgroundColor: '#00B0FF',
						backgroundColorAlpha: 1
					}, {
						duration: 0
					});
				});

				element.on('mouseleave', function () {
					$(this).velocity({
						backgroundColorAlpha: 0
					}, {
						duration: 0
					});
				});
			}
		}
	};
}