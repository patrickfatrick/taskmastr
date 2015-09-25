function toHh (date) {
	var hour = date.getHours();
	if (hour === 0) hour = 12;
	if (hour < 13) hour = hour;
	if (hour >= 13) hour = hour - 12;
	return hour;
}

module.exports = toHh;