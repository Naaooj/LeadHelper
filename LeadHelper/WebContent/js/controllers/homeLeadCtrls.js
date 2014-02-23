'use strict';

var homeLeadCtrls = angular.module('homeLeadCtrls', []);

homeLeadCtrls
.controller('HomeCtrl', ['$scope', '$filter', '$http', '$injector',
    function HomeController($scope, $filter, $http, $injector) {
                     	
   	}
])
.controller('MeetingCtrl', function MeetingCtrl($scope, $filter, $http, $injector, pointStorage, filterFilter) {
	var meetings = $scope.meetings = [];
	
	pointStorage.get(function(results) {
		meetings = $scope.meetings = results;
	});
	var points = $scope.points = [];
	
	// Defining some var for the controller
	$scope.editedMeeting = null;
	$scope.editedPoint = null;
	
	$scope.changeSubmitLabel = function() {
		var val = $scope.meetings.some(function(e) {
			return (e.meetingDate == $scope.meetingDate);
		});
		var lbl;
		if (val) {
			lbl = "Supprimer";
		} else {
			lbl = "Ajouter";
		}
		$('#addMeetingForm').find(":submit").attr('value', lbl);
	};
	
	$scope.addMeeting = function() {
		var meetingDate = $scope.meetingDate;
		if (meetingDate) {
			var meeting = null;
			var val = $scope.meetings.some(function(e) {
				if (e.meetingDate == $scope.meetingDate) {
					meeting = e;
					return true;
				}
				return false;
			});
			if (val && meeting) {
				$scope.editedMeeting = meeting;
				$scope.removeMeeting();
			} else {
				meetings.push({
					id: null,
					meetingDate: meetingDate,
					meetingPoints: []
				});
				meetings.sort(function(m1, m2) {
					return Date.parse(m2.meetingDate) - Date.parse(m1.meetingDate);
				});
			}
			$scope.changeSubmitLabel();
		}
	};
	
	$scope.editMeeting = function(meeting) {
		if ($scope.editedMeeting && $scope.editedMeeting == meeting) {
			$scope.saveMeeting();
		} else {
			$scope.editedMeeting = meeting;
			points = $scope.points = meeting.meetingPoints;
		}
	};
	
	$scope.saveMeeting = function() {
		pointStorage.saveMeeting($scope.editedMeeting);
		$scope.editedMeeting = null;
	};
	
	$scope.$watch('meetings', function (newValue, oldValue) {
		if (newValue !== oldValue) {
			pointStorage.put(meetings);
		}
	}, true);

	$scope.addPoint = function() {
		var newPoint = $scope.point.trim();
		if (!newPoint.length) {
			return;
		}
		
		points.push({
			title: newPoint,
			completed: false
		});
		
		$scope.point = '';
	};
	
	$scope.editPoint = function(point) {
		$scope.editedPoint = point;
		// Cloning the point
		$scope.originalPoint = angular.extend({}, point);
	};
	
	$scope.pointEdited = function(point) {
		$scope.editedPoint = null;
		point.title = point.title.trim();
		if (!point.title) {
			$scope.removePoint(point);
		}
	};
	
	$scope.revertPoint = function(point) {
		points[points.indexOf(point)] = $scope.originalPoint;
		$scope.pointEdited($scope.originalPoint);
	};
	
	$scope.removePoint = function(point) {
		points.splice(points.indexOf(point), 1);
	};
	
	$scope.removeMeeting = function() {
		bootbox.confirm("Etes-vous sûr ?", function(result) {
			if (result == true) {
				$scope.meetings.splice(meetings.indexOf($scope.editedMeeting), 1);
				pointStorage.deleteMeeting($scope.editedMeeting);
				$scope.editedMeeting = null;
				$scope.$apply();
			}
		});
	};
})
.controller('PlanningCtrl', function PlanningCtrl($scope, $filter, $http, $injector, pointStorage, filterFilter) {
	// now
	var d = new Date();
	this.t = getNumberOfDaysInMonth(d);
	this.before = getNumberOfDaysBeforeFirst(d);
	this.after = getNumberOfDaysAfterLast(d);
	render(d);
});
