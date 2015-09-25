/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String}	the full month
 */
function toMMM (date) {
	var months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	var month = date.getMonth().toString();
	return months[month];
}

module.exports = toMMM;