'ues strict';

homeLeadCtrls.directive('pointValidate', function () {
	var ENTER_KEY = 13;

	return function (scope, elem, attrs) {
		elem.bind('keydown', function (event) {
			if (event.keyCode === ENTER_KEY) {
				scope.$apply(attrs.pointValidate);
			}
		});
	};
});
