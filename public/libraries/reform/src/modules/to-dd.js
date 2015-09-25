/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the date of the month with no leading zeros
 */
function toDd (date) {
	var day = date.getDate().toString();
	return day;
}

module.exports = toDd;