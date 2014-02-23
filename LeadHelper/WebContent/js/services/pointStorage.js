'use strict';

/**
 * Services that persists and retrieves Points from localStorage or from backend
 */
homeLeadCtrls.factory('pointStorage', function ($http) {
	var STORAGE_ID = 'lead-helper-storage';

	var storage = {};
	storage.get = function(callback) {
		if (navigator.onLine) {
			$http.get('meeting/getMeetings')
			.success(function(data, status, header, config) {
				callback(data);
			})
			.error(function(data, status, header, config) {
				console.log(status);
			});
		} else {
			callback(JSON.parse(localStorage.getItem(STORAGE_ID) || '[]'));
		}
	};

	storage.put = function(meetings) {
		if (meetings === null) {
			return;
		}
		if (navigator.onLine) {
			meetings.forEach(function(e) {
				// Not saved yet, sending to server
				if (e.id === null) {
					storage.saveMeeting(e);
				}
			});
		} else {
			localStorage.setItem(STORAGE_ID, JSON.stringify(meetings));	
		}
	};
		
	storage.saveMeeting = function(meeting) {
		$http({
			method: 'POST',
			url: 'meeting/saveMeeting',
			data: angular.toJson(meeting),
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data) {
			meeting.id = data;
		});
	};
	
	storage.deleteMeeting = function(meeting) {
		if (navigator.onLine) {
			$http({
				method: 'POST',
				url: 'meeting/deleteMeeting',
				data: meeting.id,
				headers: {'Content-Type': 'application/json'}
			});
		}
	};
	
	return storage;
});
