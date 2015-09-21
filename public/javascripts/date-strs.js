/**
* Takes a string containing: 1) a task, 2) human-readable date representation,
* and outputs the task and a date object
* @params {String} item user-input task (including date)
* @returns {String} item the task without the date information
* @returns {Date} dateObj the corresponding due date
*/

import moment from 'moment';
import date from 'date.js';

export default function (item) {
	const keywords = [
		'next', ' on ', 'tomorrow',
		'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
		'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
		'January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
		'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
		' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sept ', ' Oct ', ' Nov ', ' Dec ',
		' jan ', ' feb ', ' mar ', ' apr ', ' may ', ' jun ', ' jul ', ' aug ', ' sept ', ' oct ', ' nov ', ' dec ',
		' 01/', ' 02/', ' 03/', ' 04/', ' 05/', ' 06/', ' 07/', ' 08/', ' 09/', ' 10/', 
		' 11/', ' 12/', ' 13/', ' 14/', ' 15/', ' 16/', ' 17/', ' 18/', ' 19/', ' 20/', 
		' 21/', ' 22/', ' 23/', ' 24/', ' 25/', ' 26/', ' 27/', ' 28/', ' 29/', ' 30/', ' 31/',
		' 2015-', ' 2016-', '2017-', '2018-', '2019-', '2020-'
	];
	const dateFormats = ['MM-DD-YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'MMM D', 'MMM Do', 'MMM Do, YYYY', 'MMMM D', 'MMMM Do', 'MMMM Do, YYYY'];
	
	let keyword;
	keywords.some((val, i) => {
		const index = item.indexOf(val);
		if (index !== -1) {
			keyword = index;
			return true;
		}
	});
	let momentObj = moment(item.slice(keyword, item.length), dateFormats);
	let dateObj = (momentObj.isValid()) ? momentObj._d : date(item.slice(keyword, item.length));
	//console.log('Date: ' + dateObj);
	if (Date.parse(dateObj) <= moment().startOf('day')._d) {
		dateObj = moment(dateObj).add(1, 'y')._d;
		item = item.slice(0, 1).toUpperCase() + item.slice(1, keyword);
	} else {
		item = item.slice(0, 1).toUpperCase() + item.slice(1, keyword);
	}
	return {item: item, dateObj: dateObj};
}