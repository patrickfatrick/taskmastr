/**
 * Take a user-input date in any format and convert it to several formats
 * Also serves as a wrapper for common JS date methods like toUTCString and toISOString
 * toLocaleDateString is currently not well-supported especially on mobile
 * 
 * Author: Patrick Fricano
 * 
 * convert.format = 'string': string such as '9/12/2015', '12/9/2015', or '2015-9-12' with or without leading zeros
 * convert.format = 'iso': ISO string including time such as '2015-09-12T23:06:19Z'
 * convert.format = 'isoShort': ISO string without time such as '2015-09-12'
 * convert.format = 'utc': UTC string such as 'Sat, 12 Sep 2015 06:00:00 GMT'
 * convert.format = 'utcShort': UTC string without time such as 'Sat, 12 Sep 2015'
 * convert.format = 'unix': milliseconds since January 1, 1970
 * convert.inputClass: class name on the text input field to search for
 * convert.outputClass: class name on the text ouput field to search for
 * convert.options: if format === string, set order, delimiter and number of digits included
 */

let convert = {
	search: [
		'yyyy', // four-digit year 2015
		'yy', // two-digit year (20)15
		'DDD', // full day of the week Sunday-Saturday
		'ddd', // two-digit date of the month 01-31
		'DD', // abbreviated day of the week Sun-Sat
		'dd', // date of the month with no leading zeros 1-31
		'MMM', // full month January-December
		'mmm', // two-digit month 00-12
		'MM', // abbreviated month Jan-Dec
		'mm', // month with no leading zeros 1-12
		'hhh', // two-digit hours 01-12
		'hh', // hour with no leading zeros 1-12
		'ttt', // two-digit minutes 00-59
		'tt', // minutes with no leading zeros 0-59
		'AP', // AM or PM
		'ap', // am or pm
		'mll', //milliseconds 000-999
		'ml', //milliseconds with no leading zeros 0-999
		'zz' // timezone offset UTC -6:00
	],
	to: {} // Where the conversion methods will go
};

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the four-digit year
 */
convert.to.yyyy = date => {
	return date.getFullYear();
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit year
 */
convert.to.yy = date => {
	return date.getFullYear().toString().substr(2);
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit month
 */
convert.to.mmm = date => {
	let month = (date.getMonth() + 1).toString();
	return (month.length < 2) ? '0' + month : month;
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the month with no leading zeros
 */
convert.to.mm = date => {
	let month = (date.getMonth() + 1).toString();
	return month;
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String}	the full month
 */
convert.to.MMM = date => {
	const months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	let month = date.getMonth().toString();
	return months[month];
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String}	the abbreviated month
 */
convert.to.MM = date => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov',  'Dec']
	let month = date.getMonth().toString();
	return months[month];
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit date of the month
 */
convert.to.ddd = date => {
	let day = date.getDate().toString();
	return (day.length < 2) ? '0' + day : day;
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the date of the month with no leading zeros
 */
convert.to.dd = date => {
	let day = date.getDate().toString();
	return day;
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String} the full day of the week
 */
convert.to.DDD = date => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let dayOfWeek = date.getDay();
	return days[dayOfWeek];
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the abbreviated day of the week
 */
convert.to.DD = date => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	let dayOfWeek = date.getDay();
	return days[dayOfWeek];
}

convert.to.hhh = date => {
	let hour = date.getHours();
	if (hour === 0) hour = 12;
	if (hour < 13) hour = hour;
	if (hour >= 13) hour = hour - 12;
	hour = hour.toString();
	return (hour.length < 2) ? '0' + hour : hour;
}

convert.to.hh = date => {
	let hour = date.getHours();
	if (hour === 0) hour = 12;
	if (hour < 13) hour = hour;
	if (hour >= 13) hour = hour - 12;
	return hour;
}

convert.to.ttt = date => {
	let minute = date.getMinutes().toString();
	return (minute.length < 2) ? '0' + minute : minute;
}

convert.to.tt = date => {
	let minute = date.getMinutes().toString();
	return minute;
}

convert.to.ap = date => {
	let hour = date.getHours();
	let ampm = (hour < 12) ? 'am' : 'pm';
	return ampm;
}

convert.to.AP = date => {
	let hour = date.getHours();
	let ampm = (hour < 12) ? 'AM' : 'PM';
	return ampm;
}

convert.to.mll = date => {
	let milliseconds = date.getMilliseconds().toString();
	switch (milliseconds.length) {
		case 1:
			milliseconds = '00' + milliseconds;
			break;
		case 2:
			milliseconds = '0' + milliseconds;
			break;
		default:
			milliseconds = milliseconds;
			break;
	}
	return milliseconds;
}

convert.to.ml = date => {
	let milliseconds = date.getMilliseconds().toString();
	return milliseconds;
}

convert.to.zz = date => {
	let offset = date.getTimezoneOffset() / 60 * -1;
	return 'UTC ' + offset + ':00';
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Object} 	input a string or date object (something that can be converted to a valid date)
 * @param {String} format a string indicating the output date format
 * @returns {Date}	if string passes the test, return the date object
 */
convert.to.string = (input, format) => {
	const date = convert.to.date(input);
	let converted = format;
	for (let i of convert.search) {
		if (converted.indexOf(i) !== -1) {
			//console.log('Search string is: ' + i);
			//console.log('Converted string is: ' + convert.to[i](date));
			const replacer = convert.to[i](date).toString();
			converted = converted.replace(i, replacer);
			//console.log(converted);
		}
	}
	return converted;
}

/**
 * Convert the object passed to a date and test its validity
 * @param {Object} 	obj any object
 * @returns {Date}	if string passes the test, return the date object
 */
convert.to.date = obj => {
	if (obj == null) throw new TypeError('This is null or undefined');
	obj = new Date(obj);
	if (Object.prototype.toString.call(obj) === "[object Date]") {
		if (isNaN(obj.getTime())) {
			throw new TypeError('This is not a valid date');
		}
	}
	return obj;
}


/**
 * Converts a date object to an ISO string
 * @param   {Date}   date a date object
 * @returns {String} ISO String including time
 */
convert.to.iso = string => {
	const date = convert.to.date(string);

	return date.toISOString();
}

/**
 * Converts a date object to an ISO string without the time
 * @param   {Date}   date a date object
 * @returns {String} ISO String without time (just the date)
 */
convert.to.isoShort = string => {
	const date = convert.to.date(string);
	return date.toISOString().split('T')[0];
}

/**
 * Converts a date object to a UTC string
 * @param   {Date}   date a date object
 * @returns {String} UTC string including time
 */
convert.to.utc = string => {
	const date = convert.to.date(string);

	return date.toUTCString();
}

/**
 * Converts a date object to a UTC string without the time
 * @param   {Date}   date a date object
 * @returns {String} UTC string without time (just the date)
 */
convert.to.utcShort = string => {
	const date = convert.to.date(string);

	const arr = date.toUTCString().split(' ');
	let newArr = [];

	console.log(arr);
	for (var i = 0; i < 4; i++) {
		newArr.push(arr[i]);
	}

	return newArr.join(' ');

}

/**
 * Converts a date object to UNIX time (milliseconds from January 1, 1970)
 * @param   {Date}   date a date object
 * @returns {Number} milliseconds from January1, 1970
 */
convert.to.unix = string => {
	const date = convert.to.date(string);

	return Date.parse(date);
}

export default convert;