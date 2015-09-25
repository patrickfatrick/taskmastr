/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String}	the abbreviated month
 */
function toMM (date) {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov',  'Dec']
	var month = date.getMonth().toString();
	return months[month];
}

module.exports = toMM;