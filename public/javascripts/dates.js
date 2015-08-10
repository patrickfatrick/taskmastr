function dateStrs(item) {
	var keywords = [
		'next', ' on ', 'tomorrow',
		'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
		'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
		'January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
		'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
		' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sept ', ' Oct ', ' Nov ', ' Dec ',
		' jan ', ' feb ', ' mar ', ' apr ', ' may ', ' jun ', ' jul ', ' aug ', ' sept ', ' oct ', ' nov ', ' dec ',
		'1/', '2/', '3/', '4/', '5/', '6/', '7/', '8/', '9/',
		'01/', '02/', '03/', '04/', '05/', '06/', '07/', '08/', '09/', '10/', '11/', '12/'
	];
	var dateFormats = ['MM-DD-YYYY', 'M-DD-YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'MMM D', 'MMM Do', 'MMM Do, YYYY', 'MMMM D', 'MMMM Do', 'MMMM Do, YYYY'];
	
	var keyword;
	keywords.some(function (val, i) {
		var index = item.indexOf(val);
		if (index !== -1) {
			keyword = index;
			return true;
		}
	});
	var momentObj = moment(item.slice(keyword, item.length), dateFormats);
	var dateObj = (momentObj.isValid()) ? momentObj._d : date(item.slice(keyword, item.length));
	//console.log('Date: ' + dateObj);
	if (Date.parse(dateObj) <= Date.now()) {
		if (Date.parse(dateObj) < Date.parse(moment().startOf('day')._d)) {
			dateObj = moment(dateObj).add(1, 'y')._d;
			item = item.slice(0, 1).toUpperCase() + item.slice(1, keyword);
		} else {
			dateObj = '';
			item = item.slice(0, 1).toUpperCase() + item.slice(1, item.length);
		}
	} else {
		item = item.slice(0, 1).toUpperCase() + item.slice(1, keyword);
	}
	return {item: item, dateObj: dateObj};
}