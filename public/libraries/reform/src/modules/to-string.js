/**
 * Convert the object passed to a date and test its validity
 * @param {Object} 	input a string or date object (something that can be converted to a valid date)
 * @param {String} format a string indicating the output date format
 * @returns {Date}	if string passes the test, return the date object
 */
var search = require('../reform').search;
var toDate = require('./to-date');
var to = {}
to.AP = require('./to-_ap_');
to.ap = require('./to-ap');
to.DD = require('./to-_dd_');
to.DDD = require('./to-_ddd_');
to.MM = require('./to-_mm_');
to.MMM = require('./to-_mmm_');
to.mm = require('./to-mm');
to.mmm = require('./to-mmm');
to.dd = require('./to-dd');
to.ddd = require('./to-ddd');
to.hh = require('./to-hh');
to.hhh = require('./to-hhh');
to.ml = require('./to-ml');
to.mll = require('./to-mll');
to.tt = require('./to-tt');
to.ttt = require('./to-ttt');
to.yy = require('./to-yy');
to.yyyy = require('./to-yyyy');
to.zz = require('./to-zz');


function toString (input, format) {
	var date = toDate(input);
	var converted = format;
	search.forEach(function(piece, i) {
		if (converted.indexOf(piece) !== -1) {
			//console.log('Search string is: ' + piece);
			//console.log('Converted string is: ' + reform.to[piece](date));
			const replacer = to[piece](date).toString();
			converted = converted.replace(piece, replacer);
			//console.log(converted);
		}
	});
	return converted;
}

module.exports = toString;
