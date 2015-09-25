/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit month
 */
export default function (date) {
	let month = (date.getMonth() + 1).toString();
	return (month.length < 2) ? '0' + month : month;
}