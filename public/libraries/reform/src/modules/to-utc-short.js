
/**
 * Converts a date object to a UTC string without the time
 * @param   {Date}   date a date object
 * @returns {String} UTC string without time (just the date)
 */
import reform from '../reform'; 

export default function (string) {
	const date = reform.to.date(string);

	const arr = date.toUTCString().split(' ');
	let newArr = [];

	console.log(arr);
	for (var i = 0; i < 4; i++) {
		newArr.push(arr[i]);
	}

	return newArr.join(' ');

}