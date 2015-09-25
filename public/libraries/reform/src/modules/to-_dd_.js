/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the abbreviated day of the week
 */
function toDD (date) {
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var dayOfWeek = date.getDay();
	return days[dayOfWeek];
}

module.exports = toDD;