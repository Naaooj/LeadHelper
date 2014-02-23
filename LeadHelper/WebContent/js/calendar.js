'use strict';

// Days start a sunday with idx 0
var dayIDs = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var DAY_MS = 86400000;
var MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function render(date) {
	
	var startDate = cloneDate(date);
	var endDate = cloneDate(date);
	
	// Define the current visualisation as beeing the first of the month
	startDate.setDate(1);
	endDate.setDate(1);
	
	var nbrOfDays = getNumberOfDaysInMonth(startDate);
	endDate.setDate(nbrOfDays);
	addDays(endDate, getNumberOfDaysAfterLast(startDate));
	
	// Remove the number of days corresponding to the visualization begining
	// - 1 because we start at monday not sunday
	// + 7 because there are 7 days in a week
	// % to get the modulo...
	addDays(startDate, -(startDate.getDay() - 1 + 7) % 7);
	
	var delta = Math.round((endDate - startDate) / DAY_MS);
	var numberOfRows = Math.round(delta / 7);
	
	renderHtml(date, startDate, numberOfRows); 
}

function renderHtml(currentDate, startDate, nbrOfRows) {
	$('#calendarContainer').empty();
	var html = "<div class='calendar'>";
	html += "<div class='calendar-header'><div class='calendar-header-tb'><div class='calendar-row'>";
	html += "<div class='calendar-prev'><<</div><div class='calendar-title'>" + MONTHS[currentDate.getMonth()] + " " + currentDate.getFullYear() + "</div><div class='calendar-next'>>></div>";
	html += "</div></div></div><div class='group'><div class='calendar-row'>";
	for (var i = 1; i <= nbrOfRows * 7; ++i) {
		html += "<div class='calendar-cell ";
		if (currentDate.getMonth() == startDate.getMonth()) {
			html += "current-month";
		} else {
			html += "other-month";
		}
		html += "'>" + startDate.getDate() + "</div>";
		if (i > 1 && i%7==0) {
			html += "</div><div class='calendar-row'>";
		}
		addDays(startDate, 1);
	}
	html += "</div></div><div>";
	var htmlCal = $(html);
	htmlCal.appendTo($('#calendarContainer'));
	
	htmlCal.find('.calendar-prev').click(function(event) {
		previousMonth(event, currentDate);
	});
	htmlCal.find('.calendar-next').click(function(event) {
		nextMonth(event, currentDate);
	});
}

function previousMonth(event, date) {
	render(addMonth(date, -1));
}

function nextMonth(event, date) {
	render(addMonth(date, 1));
}

/**
 * Clone a date
 * @param d
 * @returns {Date}
 */
function cloneDate(d) {
	return new Date(+d);
}

function addDays(date, nbrOfDays) {
	if (+date) {
		date.setDate(date.getDate() + nbrOfDays);
	}
	return date;
}

function addMonth(date, nbrOfMonths) {
	if (+date) {
		var m = date.getMonth() + nbrOfMonths, check = cloneDate(date);
		check.setDate(1);
		check.setMonth(m);
		date.setMonth(m);
		while (date.getMonth() != check.getMonth()) {
			date.setDate(date.getDate() + (date < check ? 1 : -1));
		}
	}
	return date;
}

function getNumberOfDaysInMonth(d) {
	var clonedDate;
	if (!d) {
		clonedDate = new Date();
	} else {
		clonedDate = cloneDate(d);
	}
	clonedDate.setDate(1);
	var initialTime = clonedDate.getTime();
	clonedDate.setMonth(d.getMonth() + 1);
	clonedDate.setDate(1);
	var nextTime = clonedDate.getTime();
	return Math.round((nextTime - initialTime) / DAY_MS);
}

function getNumberOfDaysBeforeFirst(d) {
	var clonedDate = cloneDate(d);
	clonedDate.setDate(1);
	// Sunday has value 0, need to hack the calculation
	return clonedDate.getDay() == 0 ? 6 : (clonedDate.getDay() - 1);
}

function getNumberOfDaysAfterLast(d) {
	var clonedDate = cloneDate(d);
	clonedDate.setDate(getNumberOfDaysInMonth(d));
	// Sunday has value 0, need to hack the calculation
	return clonedDate.getDay() == 0 ? 6 : 7 - clonedDate.getDay();
}