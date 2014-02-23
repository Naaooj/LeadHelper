'ues strict';

// Inject the timeout method from angular
homeLeadCtrls.directive('pointFocus', function pointFocus($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.pointFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
});
