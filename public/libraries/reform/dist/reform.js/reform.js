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

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modulesToDate = require('./modules/to-date');

var _modulesToDate2 = _interopRequireDefault(_modulesToDate);

var _modulesToYyyy = require('./modules/to-yyyy');

var _modulesToYyyy2 = _interopRequireDefault(_modulesToYyyy);

var _modulesToYy = require('./modules/to-yy');

var _modulesToYy2 = _interopRequireDefault(_modulesToYy);

var _modulesToMmm = require('./modules/to-mmm');

var _modulesToMmm2 = _interopRequireDefault(_modulesToMmm);

var _modulesToMm = require('./modules/to-mm');

var _modulesToMm2 = _interopRequireDefault(_modulesToMm);

var _modulesToMMM = require('./modules/to-MMM');

var _modulesToMMM2 = _interopRequireDefault(_modulesToMMM);

var _modulesToMM = require('./modules/to-MM');

var _modulesToMM2 = _interopRequireDefault(_modulesToMM);

var _modulesToDd = require('./modules/to-dd');

var _modulesToDd2 = _interopRequireDefault(_modulesToDd);

var _modulesToDd3 = _interopRequireDefault(_modulesToDd);

var _modulesToDDD = require('./modules/to-DDD');

var _modulesToDDD2 = _interopRequireDefault(_modulesToDDD);

var _modulesToDD = require('./modules/to-DD');

var _modulesToDD2 = _interopRequireDefault(_modulesToDD);

var _modulesToHhh = require('./modules/to-hhh');

var _modulesToHhh2 = _interopRequireDefault(_modulesToHhh);

var _modulesToHh = require('./modules/to-hh');

var _modulesToHh2 = _interopRequireDefault(_modulesToHh);

var _modulesToTtt = require('./modules/to-ttt');

var _modulesToTtt2 = _interopRequireDefault(_modulesToTtt);

var _modulesToTt = require('./modules/to-tt');

var _modulesToTt2 = _interopRequireDefault(_modulesToTt);

var _modulesToAp = require('./modules/to-ap');

var _modulesToAp2 = _interopRequireDefault(_modulesToAp);

var _modulesToAP = require('./modules/to-AP');

var _modulesToAP2 = _interopRequireDefault(_modulesToAP);

var _modulesToMll = require('./modules/to-mll');

var _modulesToMll2 = _interopRequireDefault(_modulesToMll);

var _modulesToMl = require('./modules/to-ml');

var _modulesToMl2 = _interopRequireDefault(_modulesToMl);

var _modulesToZz = require('./modules/to-zz');

var _modulesToZz2 = _interopRequireDefault(_modulesToZz);

//import string from 'to-string';
//import iso from 'to-iso';
//import isoShort from 'to-isoShort';
//import utc from 'to-utc';
//import utcShort from 'to-utcShort';
//import unix from 'to-unix';

var reform = {
	search: ['yyyy', // four-digit year 2015
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

reform.to.date = _modulesToDate2['default'];
reform.to.yyyy = _modulesToYyyy2['default'];
reform.to.yy = _modulesToYy2['default'];
reform.to.mmm = _modulesToMmm2['default'];
reform.to.mm = _modulesToMm2['default'];
reform.to.MMM = _modulesToMMM2['default'];
reform.to.MM = _modulesToMM2['default'];
reform.to.ddd = _modulesToDd2['default'];
reform.to.dd = _modulesToDd3['default'];
reform.to.DDD = _modulesToDDD2['default'];
reform.to.DD = _modulesToDD2['default'];
reform.to.hhh = _modulesToHhh2['default'];
reform.to.hh = _modulesToHh2['default'];
reform.to.ttt = _modulesToTtt2['default'];
reform.to.tt = _modulesToTt2['default'];
reform.to.ap = _modulesToAp2['default'];
reform.to.AP = _modulesToAP2['default'];
reform.to.mll = _modulesToMll2['default'];
reform.to.ml = _modulesToMl2['default'];
reform.to.zz = _modulesToZz2['default'];
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
reform.to.string = function (input, format) {
	var date = reform.to.date(input);
	var converted = format;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = reform.search[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var i = _step.value;

			if (converted.indexOf(i) !== -1) {
				//console.log('Search string is: ' + i);
				//console.log('Converted string is: ' + reform.to[i](date));
				var replacer = reform.to[i](date).toString();
				converted = converted.replace(i, replacer);
				//console.log(converted);
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator['return']) {
				_iterator['return']();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return converted;
};

reform.to.iso = function (string) {
	var date = reform.to.date(string);

	return date.toISOString();
};

reform.to.isoShort = function (string) {
	var date = reform.to.date(string);
	return date.toISOString().split('T')[0];
};

reform.to.unix = function (string) {
	var date = reform.to.date(string);

	return Date.parse(date);
};

reform.to.utc = function (string) {
	var date = reform.to.date(string);

	return date.toUTCString();
};

reform.to.utcShort = function (string) {
	var date = reform.to.date(string);

	var arr = date.toUTCString().split(' ');
	var newArr = [];

	console.log(arr);
	for (var i = 0; i < 4; i++) {
		newArr.push(arr[i]);
	}

	return newArr.join(' ');
};

exports['default'] = reform;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (date) {
	var hour = date.getHours();
	var ampm = hour < 12 ? 'AM' : 'PM';
	return ampm;
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the abbreviated day of the week
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (date) {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var dayOfWeek = date.getDay();
  return days[dayOfWeek];
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String} the full day of the week
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayOfWeek = date.getDay();
  return days[dayOfWeek];
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String}	the abbreviated month
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var month = date.getMonth().toString();
  return months[month];
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {String}	the full month
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (date) {
  var months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = date.getMonth().toString();
  return months[month];
};

module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (date) {
	var hour = date.getHours();
	var ampm = hour < 12 ? 'am' : 'pm';
	return ampm;
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Object} 	obj any object
 * @returns {Date}	if string passes the test, return the date object
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (obj) {
	console.log(obj);
	if (obj == null) throw new TypeError('This is null or undefined');
	obj = new Date(obj);
	if (Object.prototype.toString.call(obj) === "[object Date]") {
		if (isNaN(obj.getTime())) {
			throw new TypeError('This is not a valid date');
		}
	}
	return obj;
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the date of the month with no leading zeros
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (date) {
  var day = date.getDate().toString();
  return day;
};

module.exports = exports["default"];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit date of the month
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (date) {
  var day = date.getDate().toString();
  return day.length < 2 ? '0' + day : day;
};

module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (date) {
	var hour = date.getHours();
	if (hour === 0) hour = 12;
	if (hour < 13) hour = hour;
	if (hour >= 13) hour = hour - 12;
	return hour;
};

module.exports = exports["default"];
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (date) {
	var hour = date.getHours();
	if (hour === 0) hour = 12;
	if (hour < 13) hour = hour;
	if (hour >= 13) hour = hour - 12;
	hour = hour.toString();
	return hour.length < 2 ? '0' + hour : hour;
};

module.exports = exports['default'];
/**
 * Converts a date object to an ISO string without the time
 * @param   {Date}   date a date object
 * @returns {String} ISO String without time (just the date)
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reform = require('../reform');

var _reform2 = _interopRequireDefault(_reform);

exports['default'] = function (string) {
  var date = _reform2['default'].to.date(string);
  return date.toISOString().split('T')[0];
};

module.exports = exports['default'];
/**
 * Converts a date object to an ISO string
 * @param   {Date}   date a date object
 * @returns {String} ISO String including time
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reform = require('../reform');

var _reform2 = _interopRequireDefault(_reform);

exports['default'] = function (string) {
  var date = _reform2['default'].to.date(string);

  return date.toISOString();
};

module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (date) {
	var milliseconds = date.getMilliseconds().toString();
	return milliseconds;
};

module.exports = exports["default"];
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (date) {
	var milliseconds = date.getMilliseconds().toString();
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
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the month with no leading zeros
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (date) {
  var month = (date.getMonth() + 1).toString();
  return month;
};

module.exports = exports["default"];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit month
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (date) {
  var month = (date.getMonth() + 1).toString();
  return month.length < 2 ? '0' + month : month;
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Object} 	input a string or date object (something that can be converted to a valid date)
 * @param {String} format a string indicating the output date format
 * @returns {Date}	if string passes the test, return the date object
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reform = require('../reform');

var _reform2 = _interopRequireDefault(_reform);

exports['default'] = function (input, format) {
	var date = _reform2['default'].to.date(input);
	var converted = format;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = _reform2['default'].search[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var i = _step.value;

			if (converted.indexOf(i) !== -1) {
				//console.log('Search string is: ' + i);
				//console.log('Converted string is: ' + reform.to[i](date));
				var replacer = _reform2['default'].to[i](date).toString();
				converted = converted.replace(i, replacer);
				//console.log(converted);
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator['return']) {
				_iterator['return']();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return converted;
};

module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (date) {
	var minute = date.getMinutes().toString();
	return minute;
};

module.exports = exports["default"];
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (date) {
	var minute = date.getMinutes().toString();
	return minute.length < 2 ? '0' + minute : minute;
};

module.exports = exports['default'];
/**
 * Converts a date object to UNIX time (milliseconds from January 1, 1970)
 * @param   {Date}   date a date object
 * @returns {Number} milliseconds from January1, 1970
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reform = require('../reform');

var _reform2 = _interopRequireDefault(_reform);

exports['default'] = function (string) {
  var date = _reform2['default'].to.date(string);

  return Date.parse(date);
};

module.exports = exports['default'];

/**
 * Converts a date object to a UTC string without the time
 * @param   {Date}   date a date object
 * @returns {String} UTC string without time (just the date)
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reform = require('../reform');

var _reform2 = _interopRequireDefault(_reform);

exports['default'] = function (string) {
	var date = _reform2['default'].to.date(string);

	var arr = date.toUTCString().split(' ');
	var newArr = [];

	console.log(arr);
	for (var i = 0; i < 4; i++) {
		newArr.push(arr[i]);
	}

	return newArr.join(' ');
};

module.exports = exports['default'];
/**
 * Converts a date object to a UTC string
 * @param   {Date}   date a date object
 * @returns {String} UTC string including time
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reform = require('../reform');

var _reform2 = _interopRequireDefault(_reform);

exports['default'] = function (string) {
  var date = _reform2['default'].to.date(string);

  return date.toUTCString();
};

module.exports = exports['default'];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the two-digit year
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (date) {
  return date.getFullYear().toString().substr(2);
};

module.exports = exports["default"];
/**
 * Convert the object passed to a date and test its validity
 * @param {Date} 	a date object
 * @returns {Number}	the four-digit year
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (date) {
  return date.getFullYear();
};

module.exports = exports["default"];
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (date) {
	var offset = date.getTimezoneOffset() / 60 * -1;
	return 'UTC ' + offset + ':00';
};

module.exports = exports['default'];
//# sourceMappingURL=reform.js.map