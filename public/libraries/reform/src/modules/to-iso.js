/**
 * Converts a date object to an ISO string
 * @param   {Date}   date a date object
 * @returns {String} ISO String including time
 */
var toDate = require('./to-date');

function toISO (string) {
	const date = reform.to.date(string);
	return date.toISOString();
}

module.exports = toISO;