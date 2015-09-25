function toAp(date) {
	var hour = date.getHours();
	var ampm = (hour < 12) ? 'am' : 'pm';
	return ampm;
}

module.exports - toAp;