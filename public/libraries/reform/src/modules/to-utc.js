/**
 * Converts a date object to a UTC string
 * @param   {Date}   date a date object
 * @returns {String} UTC string including time
 */
var toDate = require('./to-date');

function toUTC (string) {
	var date = reform.to.date(string);
	return date.toUTCString();
}

module.exports = tUTC;