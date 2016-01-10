import gregorian from 'gregorian';
import date from 'date.js';

/**
* Takes a string containing a human-readable date, and outputs the string and a date object
* @params {String} 	item 		user-input string (including date)
* @returns {String} 				the string without the date information
* @returns {Date} 					the corresponding due date
*/
export var extractDate = function () {
	String.prototype.extractDate = function () {
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
		
		let keyword;

		keywords.some((word) => {
			const index = this.indexOf(word);
			if (index !== -1) {
				keyword = index;
				return true;
			}
		});

		let dueDate = gregorian.reform(this.slice(keyword, this.length));
		let item;
		dueDate = (dueDate.reagent()) ? dueDate.recite() : date(this.slice(keyword, this.length));
		if (Date.parse(dueDate) <= gregorian.reform(dueDate).restart('d').recite()) {
			dueDate = gregorian.reform(dueDate).add(1, 'y').recite();
			item = this.slice(0, 1).toUpperCase() + this.slice(1, keyword);
		} else {
			item = this.slice(0, 1).toUpperCase() + this.slice(1, keyword);
		}
		return {item: item, dueDate: gregorian.reform(dueDate).to('yyyy-mm-dd')};
	};
};

/**
 * Takes a query string and outputs the value of a specified field
 * @param {String}	variable	the variable to search for
 * @return {String} 					the value of the field, or false if it doesn't exist
 */
export var getUrlVar = function () {
	String.prototype.getUrlVar = function (variable) {
		const fields = this.split('&');
		let value = false;
		fields.forEach(field => {
			let pair = field.split('=');
			if (pair[0] === variable) return value = pair[1];
		});
		return value;
	};
};