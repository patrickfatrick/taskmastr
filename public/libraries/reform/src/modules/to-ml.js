function toMl (date) {
	var milliseconds = date.getMilliseconds().toString();
	return milliseconds;
}

module.exports = toMl;