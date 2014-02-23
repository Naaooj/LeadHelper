'use strict';

/**
 * Services that persists and retrieves Points from localStorage
 */
homeLeadCtrls.factory('pointStorage', function () {
	var STORAGE_ID = 'lead-helper-storage';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (meetings) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(meetings));
		}
	};
});
