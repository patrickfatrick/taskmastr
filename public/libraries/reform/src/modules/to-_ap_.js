function toAP (date) {
	var hour = date.getHours();
	var ampm = (hour < 12) ? 'AM' : 'PM';
	return ampm;
}

module.exports = toAP;