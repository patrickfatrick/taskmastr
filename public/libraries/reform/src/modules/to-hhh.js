function toHhh (date) {
	var hour = date.getHours();
	if (hour === 0) hour = 12;
	if (hour < 13) hour = hour;
	if (hour >= 13) hour = hour - 12;
	hour = hour.toString();
	return (hour.length < 2) ? '0' + hour : hour;
}

module.exports = toHhh;