/**
 * Converts a date object to an ISO string without the time
 * @param   {Date}   date a date object
 * @returns {String} ISO String without time (just the date)
 */
var toDate = require('./to-date');

function toISOShort (string) {
	var date = reform.to.date(string);
	return date.toISOString().split('T')[0];
}

module.exports = toISOShort;