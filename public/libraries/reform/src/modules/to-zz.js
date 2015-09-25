export default function (date) {
	let offset = date.getTimezoneOffset() / 60 * -1;
	return 'UTC ' + offset + ':00';
}