/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit date of the month
 */
function toDdd (date) {
	var day = date.getDate().toString();
	return (day.length < 2) ? '0' + day : day;
}

module.exports = toDdd;