export default function (date) {
	let minute = date.getMinutes().toString();
	return (minute.length < 2) ? '0' + minute : minute;
}