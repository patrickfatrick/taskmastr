/**
 * Converts a date object to UNIX time (milliseconds from January 1, 1970)
 * @param   {Date}   date a date object
 * @returns {Number} milliseconds from January1, 1970
 */
var toDate = require('./to-date');

function toUnix (string) {
	var date = toDate(string);
	return Date.parse(date);
}

module.exports = toUnix;