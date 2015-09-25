/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String} the full day of the week
 */
function toDDD (date) {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var dayOfWeek = date.getDay();
	return days[dayOfWeek];
}

module.exports = toDDD;