/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit year
 */
export default function (date) {
	return date.getFullYear().toString().substr(2);
}