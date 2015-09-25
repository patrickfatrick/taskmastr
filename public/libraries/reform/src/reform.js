/**
 * Take a user-input date in any format and convert it to several formats
 * Also serves as a wrapper for common JS date methods like toUTCString and toISOString
 * toLocaleDateString is currently not well-supported especially on mobile
 * 
 * Author: Patrick Fricano
 * 
 * reform.format = 'string': string such as '9/12/2015', '12/9/2015', or '2015-9-12' with or without leading zeros
 * reform.format = 'iso': ISO string including time such as '2015-09-12T23:06:19Z'
 * reform.format = 'isoShort': ISO string without time such as '2015-09-12'
 * reform.format = 'utc': UTC string such as 'Sat, 12 Sep 2015 06:00:00 GMT'
 * reform.format = 'utcShort': UTC string without time such as 'Sat, 12 Sep 2015'
 * reform.format = 'unix': milliseconds since January 1, 1970
 * reform.inputClass: class name on the text input field to search for
 * reform.outputClass: class name on the text ouput field to search for
 * reform.options: if format === string, set order, delimiter and number of digits included
 */

import date from './modules/to-date';
import yyyy from './modules/to-yyyy';
import yy from './modules/to-yy';
import mmm from './modules/to-mmm';
import mm from './modules/to-mm';
import MMM from './modules/to-MMM';
import MM from './modules/to-MM';
import ddd from './modules/to-dd';
import dd from './modules/to-dd';
import DDD from './modules/to-DDD';
import DD from './modules/to-DD';
import hhh from './modules/to-hhh';
import hh from './modules/to-hh';
import ttt from './modules/to-ttt';
import tt from './modules/to-tt';
import ap from './modules/to-ap';
import AP from './modules/to-AP';
import mll from './modules/to-mll';
import ml from './modules/to-ml';
import zz from './modules/to-zz';
//import string from 'to-string';
//import iso from 'to-iso';
//import isoShort from 'to-isoShort';
//import utc from 'to-utc';
//import utcShort from 'to-utcShort';
//import unix from 'to-unix';

let reform = {
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

reform.to.date = date;
reform.to.yyyy = yyyy;
reform.to.yy = yy;
reform.to.mmm = mmm;
reform.to.mm = mm;
reform.to.MMM = MMM;
reform.to.MM = MM;
reform.to.ddd = ddd;
reform.to.dd = dd;
reform.to.DDD = DDD;
reform.to.DD = DD;
reform.to.hhh = hhh;
reform.to.hh = hh;
reform.to.ttt = ttt;
reform.to.tt = tt;
reform.to.ap = ap;
reform.to.AP = AP;
reform.to.mll = mll;
reform.to.ml = ml;
reform.to.zz = zz;
//reform.to.string = string;
//reform.to.iso = iso;
//reform.to.isoShort = isoShort;
//reform.to.utc = utc;
//reform.to.utcShort = utcShort;
//reform.to.unix = unix;

/**
 * Convert the object passed to a date and test its validity
 * @param {Object} 	input a string or date object (something that can be converted to a valid date)
 * @param {String} format a string indicating the output date format
 * @returns {Date}	if string passes the test, return the date object
 */
reform.to.string = (input, format) => {
	const date = reform.to.date(input);
	let converted = format;
	for (let i of reform.search) {
		if (converted.indexOf(i) !== -1) {
			//console.log('Search string is: ' + i);
			//console.log('Converted string is: ' + reform.to[i](date));
			const replacer = reform.to[i](date).toString();
			converted = converted.replace(i, replacer);
			//console.log(converted);
		}
	}
	return converted;
}

reform.to.iso = (string) => {
	const date = reform.to.date(string);

	return date.toISOString();
}
	
reform.to.isoShort =  (string) => {
	const date = reform.to.date(string);
	return date.toISOString().split('T')[0];
}

reform.to.unix = (string) => {
	const date = reform.to.date(string);

	return Date.parse(date);
}

reform.to.utc = (string) => {
	const date = reform.to.date(string);

	return date.toUTCString();
}

reform.to.utcShort = (string) => {
	const date = reform.to.date(string);

	const arr = date.toUTCString().split(' ');
	let newArr = [];

	console.log(arr);
	for (var i = 0; i < 4; i++) {
		newArr.push(arr[i]);
	}

	return newArr.join(' ');
}

export default reform;