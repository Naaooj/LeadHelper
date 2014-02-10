'use strict';

var displaySystemStatus = function(msg) {
	$('#systemStatus').show();
	$('#systemStatus').html(msg);
	setTimeout(function() {
		$('#systemStatus').fadeOut("slow");
	}, 1000);
};
var leadHelperApp = angular.module('leadHelperApp', [
    'ngRoute', 'homeLeadCtrls'
])
.config(['$routeProvider',
    function($routeProvider) {
		$routeProvider
		.when('/todo/todo/:todoId', {
			templateUrl: 'partials/todo.html',
			controller: 'TodoCtrl',
			css: 'resources/todo.css'
		})
		.otherwise({
			templateUrl: 'partials/home.html'
		});
	}
])
.directive('head', ['$rootScope', '$compile', 
    function($rootScope, $compile) {
		return {
			restrict: 'E',
			link: function(scope, elem) {
				var html = '<link rel="stylesheet" ng-repeat="cssUrl in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                // Connect on route change event
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if (current && current.$$route && current.$$route.css) {
                    	// Build an arrayif it's not one
                        if (!Array.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet) {
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if (next && next.$$route && next.$$route.css) {
                    	// Build an arrayif it's not one
                    	if (!Array.isArray(next.$$route.css)) {
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet) {
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
			}
		};
	}
]);