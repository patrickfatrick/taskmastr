/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the month with no leading zeros
 */
export default function (date) {
	let month = (date.getMonth() + 1).toString();
	return month;
}